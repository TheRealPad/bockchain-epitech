from flask import Blueprint

from api.services.XrpLedger import XrpLedger

marketplace_routes = Blueprint('marketplace_routes', __name__)

@marketplace_routes.route('/offers', methods=['GET'])
def retrieve_offers():
    xrp_ledger = XrpLedger()
    return "all sell offers", 200

@marketplace_routes.route('/sellOffer', methods=['POST'])
def create_sell_offer():
    xrp_ledger = XrpLedger()
    return "created sell offer", 200

@marketplace_routes.route('/buyOffer', methods=['POST'])
def create_buy_offer():
    xrp_ledger = XrpLedger()
    return "created buy offer", 200
