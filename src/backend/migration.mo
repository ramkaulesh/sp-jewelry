import Map "mo:core/Map";

module Migration {
  type OldProduct = { id : Text };
  type OldStripeConfig = { allowedCountries : [Text]; secretKey : Text };
  type UserRole = { #admin; #user; #guest };
  type UserProfile = { name : Text; email : Text };
  type OldAccessControlState = {
    var adminAssigned : Bool;
    userRoles : Map.Map<Principal, UserRole>;
  };
  type OldActor = {
    products : Map.Map<Text, OldProduct>;
    var configuration : ?OldStripeConfig;
    accessControlState : OldAccessControlState;
    userProfiles : Map.Map<Principal, UserProfile>;
  };
  type NewProduct = {
    id : Text;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    imageUrl : Text;
    featured : Bool;
  };
  type NewActor = {
    products : Map.Map<Text, NewProduct>;
    stripeConfig : { var publicKey : Text };
  };

  public func run(old : OldActor) : NewActor {
    let newProducts = old.products.map<Text, OldProduct, NewProduct>(
      func(_, p) = {
        id = p.id;
        name = "";
        description = "";
        price = 0;
        category = "";
        imageUrl = "";
        featured = false;
      }
    );
    let pk = switch (old.configuration) {
      case (?cfg) ""; // old config had no publicKey
      case null "";
    };
    {
      products = newProducts;
      stripeConfig = { var publicKey = pk };
    };
  };
};
