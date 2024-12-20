from flask import Blueprint, jsonify

from api.services.XrpLedger import XrpLedger
from api.services.db_services import add_wallet_address

wallet_routes = Blueprint('wallet_routes', __name__)

@wallet_routes.route('/wallet', methods=['POST'])
def create_wallet():
    xrp_ledger = XrpLedger()
    wallet = xrp_ledger.create_wallet()
    if "error" in add_wallet_address(wallet["account_data"]["Account"]):
        return jsonify({"error": "Error the wallet address"}), 500
    return wallet

@wallet_routes.route('/wallet/<string:wallet>', methods=['GET'])
def retrieve_wallet(wallet):
    xrp_ledger = XrpLedger()
    return xrp_ledger.retrieve_wallet(wallet)
