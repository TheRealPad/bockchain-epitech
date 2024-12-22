from flask import Blueprint, request
from xrpl.wallet import Wallet
from api.services.Marketplace import marketplace_service

from api.services.XrpLedger import xrp_ledger

marketplace_routes = Blueprint('marketplace_routes', __name__)

@marketplace_routes.route('/offers', methods=['GET'])
def retrieve_offers():
    return marketplace_service.retrieve_sell_offers(), 200

@marketplace_routes.route('/offers/<string:wallet>', methods=['GET'])
def retrieve_account_sell_offers(wallet):
    return marketplace_service.retrieve_account_sell_offers(wallet), 200

@marketplace_routes.route('/sellOffer/<string:nftoken_id>', methods=['POST'])
def create_sell_offer(nftoken_id):
    wallet = Wallet(seed=request.json['seed'], public_key=request.json['public_key'],
                    private_key=request.json['private_key'])
    res = xrp_ledger.create_sell_offer(wallet, nftoken_id, request.json['amount'])
    if "error" in res:
        return res, 400
    return {"success": "created sell offer"}, 200

@marketplace_routes.route('/sellOffer/<string:offer_id>', methods=['DELETE'])
def delete_sell_offer(offer_id):
    wallet = Wallet(seed=request.json['seed'], public_key=request.json['public_key'],
                    private_key=request.json['private_key'])
    res = xrp_ledger.delete_sell_offer(wallet, offer_id)
    if "error" in res:
        return res, 400
    return {"success": "deleted sell offer"}, 204

@marketplace_routes.route('/accept/<string:offer_id>', methods=['POST'])
def accept_offer(offer_id):
    wallet = Wallet(seed=request.json['seed'], public_key=request.json['public_key'],
                    private_key=request.json['private_key'])
    res = xrp_ledger.buy_nft(wallet, offer_id)
    if "error" in res:
        return res, 400
    return {"success": "offer accepted"}, 200
