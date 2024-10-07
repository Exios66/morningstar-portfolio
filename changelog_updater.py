import os
from datetime import datetime
import re

def get_latest_version(content):
    version_pattern = r'## \[(\d+\.\d+\.\d+)\]'
    matches = re.findall(version_pattern, content)
    if matches:
        return matches[0]
    return '0.0.0'

def increment_version(version):
    major, minor, patch = map(int, version.split('.'))
    patch += 1
    if patch > 9:
        patch = 0
        minor += 1
    if minor > 9:
        minor = 0
        major += 1
    return f"{major}.{minor}.{patch}"

def update_changelog():
    changelog_path = 'CHANGELOG.md'
    
    # Read the current CHANGELOG.md
    try:
        with open(changelog_path, 'r') as file:
            content = file.read()
    except FileNotFoundError:
        content = "# Changelog\n\nAll notable changes to this project will be documented in this file.\n\n"

    # Get the latest version and increment it
    latest_version = get_latest_version(content)
    new_version = increment_version(latest_version)

    # Get the latest commit message
    commit_message = os.popen('git log -1 --pretty=%B').read().strip()

    # Format the new entry
    today = datetime.now().strftime('%Y-%m-%d')
    new_entry = f"## [{new_version}] - {today}\n\n### Added\n\n- {commit_message}\n\n"

    # Add the new entry after the header
    updated_content = re.sub(r'(# Changelog\n\n)', f'\\1{new_entry}', content)

    # Write the updated content back to CHANGELOG.md
    with open(changelog_path, 'w') as file:
        file.write(updated_content)

    print(f"Changelog updated with version {new_version}")

if __name__ == "__main__":
    update_changelog()