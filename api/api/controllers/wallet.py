from flask import Blueprint, jsonify

from api.services.XrpLedger import XrpLedger

wallet_routes = Blueprint('wallet_routes', __name__)

@wallet_routes.route('/wallet', methods=['POST'])
def create_wallet():
    xrp_ledger = XrpLedger()
    return xrp_ledger.create_wallet()

@wallet_routes.route('/wallet/<string:wallet>', methods=['GET'])
def retrieve_wallet(wallet):
    xrp_ledger = XrpLedger()
    return xrp_ledger.retrieve_wallet(wallet)
