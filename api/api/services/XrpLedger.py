from xrpl.clients import JsonRpcClient
from xrpl.wallet import generate_faucet_wallet
from xrpl.core import addresscodec
from xrpl.models.requests.account_info import AccountInfo
import json

class XrpLedger:
    def __init__(self):
        print("XrpLedger init")

    def check_xrp_ledger(self):
        JSON_RPC_URL = "https://s.altnet.rippletest.net:51234/"
        client = JsonRpcClient(JSON_RPC_URL)
        test_wallet = generate_faucet_wallet(client, debug=True)
        test_account = test_wallet.address
        test_xaddress = addresscodec.classic_address_to_xaddress(test_account, tag=12345, is_test_network=True)
        print("\nClassic address:\n\n", test_account)
        print("X-address:\n\n", test_xaddress)
        acct_info = AccountInfo(
            account=test_account,
            ledger_index="validated",
            strict=True,
        )
        response = client.request(acct_info)
        result = response.result
        print("response.status: ", response.status)
        print(json.dumps(response.result, indent=4, sort_keys=True))