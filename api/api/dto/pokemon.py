from dataclasses import dataclass, asdict
from typing import Any

class MissingFieldError(Exception):
    """Custom exception for missing fields in JSON data."""
    def __init__(self, field_name: str):
        super().__init__(f"Missing required field: '{field_name}' for nft")

@dataclass
class Pokemon:
   name: str
   language: str
   number: str
   series: str
   type: str
   quality: str
   holo: bool
   reverse_holo: bool
   first_edition: bool
   creation_date: str
   front_image: str
   back_image: str
   description: str

   @classmethod
   def from_json(cls, json_data):
       def require_field(data: dict, field_name: str, default: Any = None):
           """
           Ensure a field is present in the data or raise an exception.

           Args:
               data (dict): The JSON data.
               field_name (str): The field to check.
               default (Any): Default value to use if the field is optional.

           Returns:
               Any: The value of the field if present.

           Raises:
               MissingFieldError: If the field is missing and no default is provided.
           """
           if field_name not in data and default is None:
               raise MissingFieldError(field_name)
           return data.get(field_name, default)

       return cls(
           name=require_field(json_data, "name"),
           language=require_field(json_data, "language"),
           number=require_field(json_data, "number"),
           series=require_field(json_data, "series"),
           type=require_field(json_data, "type"),
           quality=require_field(json_data, "quality"),
           holo=require_field(json_data, "holo", False),  # Optional with default
           reverse_holo=require_field(json_data, "reverse_holo", False),  # Optional with default
           first_edition=require_field(json_data, "first_edition", False),  # Optional with default
           creation_date=require_field(json_data, "creation_date"),
           front_image=require_field(json_data, "front_image"),
           back_image=require_field(json_data, "back_image"),
           description=require_field(json_data, "description"),
       )

   @classmethod
   def to_dict(cls, pokemon):
       return asdict(pokemon)
