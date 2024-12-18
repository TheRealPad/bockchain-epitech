from flask import Blueprint

from api.services.XrpLedger import XrpLedger

token_routes = Blueprint('token_routes', __name__)

@token_routes.route('/tokens')
def retrieve_tokens():
    xrp_ledger = XrpLedger()
    xrp_ledger.check_xrp_ledger()
    return 'retrieve_tokens'
