import logging
import os
import datetime
import time
import sys

# Set up the logger
logger = logging.getLogger('automation_logger')
logger.setLevel(logging.DEBUG)

# Create a file handler
file_handler = logging.FileHandler('star-portfolio/logger.py')
file_handler.setLevel(logging.DEBUG)

# Create a formatter
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)

# Add the handler to the logger
logger.addHandler(file_handler)

# Log messages at different levels
logger.debug('This is a debug message')
logger.info('This is an info message')
logger.warning('This is a warning message')
logger.error('This is an error message')
logger.critical('This is a critical message')

# Log system information
current_time = datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
logger.info(f'Current UTC time: {current_time}')
logger.info('Automation Version: 1.0.0')
logger.info('Required Python Version: 3.7')
logger.info('Required Packages: logging, os, datetime, time, sys')