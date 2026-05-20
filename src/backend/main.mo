import Map "mo:core/Map";
import Migration "migration";

(with migration = Migration.run)
actor {
  public type Product = {
    id : Text;
    name : Text;
    description : Text;
    price : Nat; // in USD cents
    category : Text;
    imageUrl : Text;
    featured : Bool;
  };

  let products = Map.empty<Text, Product>();
  let stripeConfig = { var publicKey : Text = "" };

  func seedProducts() {
    let items : [Product] = [
      // Rings
      { id = "r1"; name = "Sapphire Eternity Band"; description = "A breathtaking band of deep sapphires set in 18k white gold, embodying timeless elegance."; price = 189500; category = "Rings"; imageUrl = "https://picsum.photos/seed/ring1/800/800"; featured = true },
      { id = "r2"; name = "Rose Gold Diamond Solitaire"; description = "A brilliant round diamond nestled in a lustrous rose gold setting — pure romance."; price = 325000; category = "Rings"; imageUrl = "https://picsum.photos/seed/ring2/800/800"; featured = false },
      { id = "r3"; name = "Emerald Halo Ring"; description = "Vivid Colombian emerald surrounded by a dazzling halo of pavé diamonds in platinum."; price = 475000; category = "Rings"; imageUrl = "https://picsum.photos/seed/ring3/800/800"; featured = true },
      // Necklaces
      { id = "n1"; name = "Midnight Diamond Riviere"; description = "A continuous cascade of brilliant-cut diamonds set in blackened 18k gold for dramatic allure."; price = 589000; category = "Necklaces"; imageUrl = "https://picsum.photos/seed/neck1/800/800"; featured = true },
      { id = "n2"; name = "Pearl and Gold Chain"; description = "Lustrous South Sea pearls interspersed with hand-crafted 22k gold links."; price = 149500; category = "Necklaces"; imageUrl = "https://picsum.photos/seed/neck2/800/800"; featured = false },
      { id = "n3"; name = "Ruby Collar Necklace"; description = "Pigeon-blood rubies set in a bold collar design that commands attention."; price = 398000; category = "Necklaces"; imageUrl = "https://picsum.photos/seed/neck3/800/800"; featured = false },
      // Bracelets
      { id = "b1"; name = "Diamond Tennis Bracelet"; description = "A classic line of perfectly matched round diamonds in an elegant 18k white gold setting."; price = 265000; category = "Bracelets"; imageUrl = "https://picsum.photos/seed/brace1/800/800"; featured = true },
      { id = "b2"; name = "Sapphire Bangle"; description = "Sleek 18k gold bangle adorned with a scatter of cushion-cut sapphires."; price = 97500; category = "Bracelets"; imageUrl = "https://picsum.photos/seed/brace2/800/800"; featured = false },
      { id = "b3"; name = "Emerald Gold Cuff"; description = "Bold open-cuff bracelet in hammered gold with a statement cabochon emerald centrepiece."; price = 158000; category = "Bracelets"; imageUrl = "https://picsum.photos/seed/brace3/800/800"; featured = false },
      // Earrings
      { id = "e1"; name = "Black Diamond Drop Earrings"; description = "Dramatic drops of certified black diamonds suspended in oxidised 18k gold settings."; price = 218000; category = "Earrings"; imageUrl = "https://picsum.photos/seed/ear1/800/800"; featured = true },
      { id = "e2"; name = "Pearl Chandelier Earrings"; description = "Multi-tiered chandeliers of baroque pearls and diamond accents for unforgettable evenings."; price = 87500; category = "Earrings"; imageUrl = "https://picsum.photos/seed/ear2/800/800"; featured = false },
      { id = "e3"; name = "Ruby Stud Earrings"; description = "Vivid oval rubies cradled in four-prong white gold settings — effortlessly luxurious."; price = 52000; category = "Earrings"; imageUrl = "https://picsum.photos/seed/ear3/800/800"; featured = false },
      // Pendants
      { id = "p1"; name = "Crescent Moon Diamond Pendant"; description = "An ethereal crescent moon paved with brilliant diamonds on an 18k white gold chain."; price = 135000; category = "Pendants"; imageUrl = "https://picsum.photos/seed/pend1/800/800"; featured = true },
      { id = "p2"; name = "Solitaire Emerald Pendant"; description = "A vivid pear-shaped emerald suspended on a delicate yellow gold chain — understated beauty."; price = 198000; category = "Pendants"; imageUrl = "https://picsum.photos/seed/pend2/800/800"; featured = false },
      { id = "p3"; name = "Teardrop Sapphire Pendant"; description = "Deep blue teardrop sapphire encircled by brilliant-cut diamonds on a 16-inch platinum chain."; price = 162000; category = "Pendants"; imageUrl = "https://picsum.photos/seed/pend3/800/800"; featured = false },
      // Sets
      { id = "s1"; name = "Royal Sapphire Parure"; description = "Matching necklace, earrings, and bracelet in deep sapphire and 18k white gold — the complete statement."; price = 950000; category = "Sets"; imageUrl = "https://picsum.photos/seed/set1/800/800"; featured = true },
      { id = "s2"; name = "Emerald Garden Suite"; description = "A harmonious suite of emerald and diamond jewels — ring, pendant, and earrings in 18k gold."; price = 780000; category = "Sets"; imageUrl = "https://picsum.photos/seed/set2/800/800"; featured = false },
      { id = "s3"; name = "Pearl Elegance Collection"; description = "Three-piece South Sea pearl set: necklace, stud earrings, and bangle in polished yellow gold."; price = 365000; category = "Sets"; imageUrl = "https://picsum.photos/seed/set3/800/800"; featured = true },
    ];
    for (item in items.vals()) {
      products.add(item.id, item);
    };
  };

  seedProducts();

  public query func getProducts() : async [Product] {
    products.values().toArray();
  };

  public query func getProduct(id : Text) : async ?Product {
    products.get(id);
  };

  public query func isStripeConfigured() : async Bool {
    stripeConfig.publicKey != "";
  };

  public query func getStripePublicKey() : async Text {
    stripeConfig.publicKey;
  };

  public func setStripePublicKey(key : Text) : async () {
    stripeConfig.publicKey := key;
  };
};
