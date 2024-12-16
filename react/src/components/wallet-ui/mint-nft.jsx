import { useState } from "react";
import { useMintToken } from "@nice-xrpl/react-xrpl";
import type { Pokemon } from "../dto/pokemon";

export function MintNFT() {
  // The useMintToken hook can be used to mint
  // an NFT with some data that will be encoded.
  // This is a transactional hook and requires a
  // wallet.
  const mintToken = useMintToken();
  const [pokemon, setPokemon] = useState({
    name: "",
    edition: "",
    card_number: "",
    rarity: "",
    type: "",
    image: "",
    description: "",
  });
  const [sending, setSending] = useState(false);

  return (
    <div className="WalletRow">
      Mint an NFT with data:{" "}
      <input
        placeholder={"name"}
        value={pokemon.name}
        onChange={(e) =>
          setPokemon({ ...pokemon, name: e.currentTarget.value })
        }
      />{" "}
      -{" "}
      <input
        placeholder={"type"}
        value={pokemon.type}
        onChange={(e) =>
          setPokemon({ ...pokemon, type: e.currentTarget.value })
        }
      />{" "}
      -{" "}
      <input
        placeholder={"description"}
        value={pokemon.description}
        onChange={(e) =>
          setPokemon({ ...pokemon, description: e.currentTarget.value })
        }
      />{" "}
      -{" "}
      <input
        placeholder={"card number"}
        value={pokemon.card_number}
        onChange={(e) =>
          setPokemon({ ...pokemon, card_number: e.currentTarget.value })
        }
      />{" "}
      -{" "}
      <input
        placeholder={"edition"}
        value={pokemon.edition}
        onChange={(e) =>
          setPokemon({ ...pokemon, edition: e.currentTarget.value })
        }
      />{" "}
      -{" "}
      <input
        placeholder={"rarity"}
        value={pokemon.rarity}
        onChange={(e) =>
          setPokemon({ ...pokemon, rarity: e.currentTarget.value })
        }
      />{" "}
      -{" "}
      <input
        placeholder={"image"}
        value={pokemon.image}
        onChange={(e) =>
          setPokemon({ ...pokemon, image: e.currentTarget.value })
        }
      />{" "}
      -{" "}
      {sending ? (
        "Waiting for response..."
      ) : (
        <button
          onClick={async () => {
            setSending(true);
            const result = await mintToken(JSON.stringify(pokemon), 0);
            console.log("UI: ", result);
            setSending(false);
            setPokemon({
              name: "",
              edition: "",
              card_number: "",
              rarity: "",
              type: "",
              image: "",
              description: "",
            });
          }}
          disabled={!pokemon}
        >
          Send
        </button>
      )}
    </div>
  );
}
