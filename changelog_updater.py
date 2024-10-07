import os
import subprocess
from datetime import datetime
from logger import logger, log_automation_start, log_changelog_update, log_automation_end

def read_changelog():
    """Read the existing changelog file"""
    changelog_path = 'changelog.md'
    if os.path.exists(changelog_path):
        with open(changelog_path, 'r') as file:
            return file.read()
    return ""

def write_changelog(content):
    """Write the updated changelog to the file"""
    with open('changelog.md', 'w') as file:
        file.write(content)

def get_last_version():
    """Get the last version from the changelog"""
    changelog = read_changelog()
    lines = changelog.split('\n')
    for line in lines:
        if line.startswith('## ['):
            return line.split('[')[1].split(']')[0]
    return None

def run_git_command(cmd):
    """Run a git command and return the output"""
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        logger.error(f"Error running git command {' '.join(cmd)}: {e}")
        return None

def get_commits_since_last_version(last_version):
    """Get commits since the last version"""
    if last_version:
        cmd = ['git', 'log', f'{last_version}..HEAD', '--oneline']
    else:
        cmd = ['git', 'log', '--oneline']
    
    commits = run_git_command(cmd)
    return commits.split('\n') if commits else []

def generate_new_version(last_version):
    """Generate a new version number"""
    if last_version:
        parts = last_version.split('.')
        parts[-1] = str(int(parts[-1]) + 1)
        return '.'.join(parts)
    return '0.1.0'

def get_git_info():
    """Get git repository information"""
    current_branch = run_git_command(['git', 'rev-parse', '--abbrev-ref', 'HEAD'])
    last_commit = run_git_command(['git', 'log', '-1', '--oneline'])
    return f"Current branch: {current_branch}\nLast commit: {last_commit}"

def update_changelog():
    log_automation_start("Changelog Updater")
    
    try:
        # Check if git repository exists
        if not os.path.exists('.git'):
            logger.error("No git repository found in the current directory.")
            log_automation_end("Changelog Updater", "Failed - No git repository")
            return

        # Log git repository information
        logger.info("Git repository information:\n" + get_git_info())

        # Read the existing changelog
        existing_changelog = read_changelog()

        # Get the last version
        last_version = get_last_version()
        logger.info(f"Last version found in changelog: {last_version}")

        # Generate new version
        new_version = generate_new_version(last_version)
        logger.info(f"New version generated: {new_version}")

        # Get commits since last version
        commits = get_commits_since_last_version(last_version)

        if not commits:
            logger.info("No new commits found. Changelog not updated.")
            log_automation_end("Changelog Updater", "Completed - No changes")
            return

        # Format the new changelog entry
        current_date = datetime.now().strftime("%Y-%m-%d")
        new_entry = f"## [{new_version}] - {current_date}\n"
        for commit in commits:
            new_entry += f"- {commit}\n"
        new_entry += "\n"

        # Prepend the new entry to the existing changelog
        updated_changelog = new_entry + existing_changelog

        # Write the updated changelog
        write_changelog(updated_changelog)

        # Log the changes
        log_changelog_update(new_version, commits)

        log_automation_end("Changelog Updater", "Completed")
        logger.info("Changelog updated successfully!")

    except Exception as e:
        logger.error(f"An error occurred while updating the changelog: {str(e)}")
        log_automation_end("Changelog Updater", "Failed")

if __name__ == "__main__":
    update_changelog()