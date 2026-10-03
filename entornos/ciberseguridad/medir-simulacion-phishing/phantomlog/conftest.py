import base64
import importlib
import os
import sys

import pytest
from werkzeug.security import generate_password_hash

ADMIN_USER = 'tester'
ADMIN_PASS = 's3cret-pass'


def basic_auth(user, pw):
    token = base64.b64encode(f'{user}:{pw}'.encode()).decode()
    return {'Authorization': 'Basic ' + token}


def _load_app(tmp_path, configured, trusted_proxies=0):
    os.environ['DATA_DIR'] = str(tmp_path)
    os.environ['ADMIN_USER'] = ADMIN_USER
    os.environ['TRUSTED_PROXIES'] = str(trusted_proxies)
    if configured:
        os.environ['ADMIN_PASSWORD_HASH'] = generate_password_hash(ADMIN_PASS)
    else:
        os.environ.pop('ADMIN_PASSWORD_HASH', None)
    sys.modules.pop('app', None)
    module = importlib.import_module('app')
    module.app.config.update(TESTING=True)
    return module


@pytest.fixture
def app_module(tmp_path):
    return _load_app(tmp_path, configured=True)


@pytest.fixture
def client(app_module):
    return app_module.app.test_client()


@pytest.fixture
def unconfigured(tmp_path):
    return _load_app(tmp_path, configured=False)


@pytest.fixture
def behind_one_proxy(tmp_path):
    return _load_app(tmp_path, configured=True, trusted_proxies=1)
