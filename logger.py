import logging
import os
from logging.handlers import RotatingFileHandler
from datetime import datetime, timezone
import time
import sys

def setup_logger(name, log_file, level=logging.INFO):
    """Function to set up a logger that writes to both file and console"""
    # Create logs directory if it doesn't exist
    log_dir = 'logs'
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)

    # Create formatter using UTC time
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
    formatter.converter = time.gmtime  # Use UTC time

    # Create console handler and set level to debug
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)
    console_handler.setFormatter(formatter)

    # Create file handler and set level to info
    file_handler = RotatingFileHandler(os.path.join(log_dir, log_file), maxBytes=1024*1024, backupCount=5)
    file_handler.setLevel(level)
    file_handler.setFormatter(formatter)

    # Create logger
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)

    # Add handlers to logger
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)

    return logger

# Create a logger using UTC time for the filename
current_time = datetime.now(timezone.utc)
logger = setup_logger('automation_logger', f'automation_{current_time.strftime("%Y%m%d")}.log')

def log_changelog_update(version, changes):
    """Log changelog updates"""
    logger.info(f"Changelog updated to version {version}")
    for change in changes:
        logger.info(f"- {change}")

def log_automation_start(automation_name):
    """Log the start of an automation"""
    logger.info(f"Starting automation: {automation_name}")

def log_automation_end(automation_name, status):
    """Log the end of an automation"""
    logger.info(f"Finished automation: {automation_name} - Status: {status}")

def check_system_time():
    """Check if system time is significantly different from UTC time"""
    system_time = datetime.now()
    time_difference = abs((system_time.replace(tzinfo=timezone.utc) - current_time).total_seconds())
    if time_difference > 86400:  # More than 24 hours difference
        logger.warning(f"System time differs from UTC time by {time_difference/3600:.2f} hours.")
        logger.warning("Please check your system clock and timezone settings.")

if __name__ == "__main__":
    # Check for command-line arguments
    if len(sys.argv) > 1:
        automation_name = sys.argv[1]
        log_automation_start(automation_name)
        
        # Your automation code here
        # ...

        log_automation_end(automation_name, "Completed")
    else:
        logger.debug("This is a debug message")
        logger.info("This is an info message")
        logger.warning("This is a warning message")
        logger.error("This is an error message")
        logger.critical("This is a critical message")
    
    # Print current UTC time for verification
    logger.info(f"Current UTC time: {current_time.strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Check system time
    check_system_time()

# Critical information for running automations
AUTOMATION_VERSION = "1.0.0"
REQUIRED_PYTHON_VERSION = "3.7"
REQUIRED_PACKAGES = ["logging", "os", "datetime", "time", "sys"]

logger.info(f"Automation Version: {AUTOMATION_VERSION}")
logger.info(f"Required Python Version: {REQUIRED_PYTHON_VERSION}")
logger.info(f"Required Packages: {', '.join(REQUIRED_PACKAGES)}")