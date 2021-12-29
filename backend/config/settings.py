import os
from cr5.model import Cr5Model

LEVEL_DB_DIR = os.getenv('LEVEL_DB_DIR', '/opt/Cr5-demo/data/leveldb')
SEARCH_INDEXES_DIR = os.getenv('SEARCH_INDEXES_DIR', '/opt/Cr5-demo/data/search_indexes')

APP_HOST = os.getenv('APP_HOST', 'localhost')
APP_PORT = os.getenv('APP_PORT', 5005)
RATE_LIMIT = os.getenv('RATE_LIMIT', '2 per second')

MODELS = {
    'joint_4': Cr5Model(
        model_name='joint_4',
        level_db_dir=LEVEL_DB_DIR,
        search_indexes_dir=SEARCH_INDEXES_DIR,
    ),
    'joint_28': Cr5Model(
        model_name='joint_28',
        level_db_dir=LEVEL_DB_DIR,
        search_indexes_dir=SEARCH_INDEXES_DIR,
    ),
}
