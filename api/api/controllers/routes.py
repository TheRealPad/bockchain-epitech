from flask import Flask
from api.controllers.health import health_routes
from api.controllers.nft import nft_routes
from api.controllers.wallet import wallet_routes
from api.controllers.marketplace import marketplace_routes

CUSTOM_PREFIX = "/api"

def register_routes(app: Flask):
    app.register_blueprint(health_routes, url_prefix=CUSTOM_PREFIX)
    app.register_blueprint(nft_routes, url_prefix=CUSTOM_PREFIX)
    app.register_blueprint(wallet_routes, url_prefix=CUSTOM_PREFIX)
    app.register_blueprint(marketplace_routes, url_prefix=CUSTOM_PREFIX)