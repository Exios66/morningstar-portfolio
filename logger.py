import logging
import os
from logging.handlers import RotatingFileHandler
from datetime import datetime

def setup_logger(name, log_file, level=logging.INFO):
    """Function to set up a logger that writes to both file and console"""
    # Create logs directory if it doesn't exist
    log_dir = 'logs'
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)

    # Create formatter
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

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

# Create a logger
logger = setup_logger('portfolio_logger', f'portfolio_{datetime.now().strftime("%Y%m%d")}.log')

# Example usage
if __name__ == "__main__":
    logger.debug("This is a debug message")
    logger.info("This is an info message")
    logger.warning("This is a warning message")
    logger.error("This is an error message")
    logger.critical("This is a critical message")