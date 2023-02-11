module.exports = async (app) => {
  try {
    const User = app.models.user;
    const Brand = app.models.brand;
    const Car = app.models.car;
    const Tyre = app.models.tyre;

    const carBrands = ["Toyota", "Ford", "BMW"];
    const tyreBrands = ["MRF", "Apollo", "CRP", "WHEEL"];
    const tyresSizes = ["12", "14", "15", "16"];

    // create test user
    const users = await User.create([
      {
        username: "TestUser1",
        email: "testuser1@sampleapp.com",
        password: "password",
      },
      {
        username: "TestUser2",
        email: "testuser2@sampleapp.com",
        password: "password",
      },
    ]);
    console.info("Test users created succesfully ", users);

    // create tyre brands
    const tyreBrandsInstance = await Brand.create(
      tyreBrands.map((brand) => ({
        brandName: brand,
        brandType: "tyre",
      }))
    );
    console.info("Tyre brands created succesfully ", tyreBrandsInstance);

    const tyres = await Tyre.create([
      {
        brandId: tyreBrandsInstance[0].id,
        model: "fullyrubberised",
        tyreSize: tyresSizes[0],
      },
      {
        brandId: tyreBrandsInstance[0].id,
        model: "nonpuncher",
        tyreSize: tyresSizes[1],
      },
      {
        brandId: tyreBrandsInstance[0].id,
        model: "offroad",
        tyreSize: tyresSizes[2],
      },
      {
        brandId: tyreBrandsInstance[1].id,
        model: "fullyrubberised",
        tyreSize: tyresSizes[2],
      },
      {
        brandId: tyreBrandsInstance[1].id,
        model: "nonpuncher",
        tyreSize: tyresSizes[3],
      },
      {
        brandId: tyreBrandsInstance[2].id,
        model: "offroad",
        tyreSize: tyresSizes[1],
      },
      {
        brandId: tyreBrandsInstance[2].id,
        model: "offroad",
        tyreSize: tyresSizes[3],
      },
      {
        brandId: tyreBrandsInstance[2].id,
        model: "premium",
        tyreSize: tyresSizes[2],
      },
      {
        brandId: tyreBrandsInstance[3].id,
        model: "meta",
        tyreSize: tyresSizes[1],
      },
      {
        brandId: tyreBrandsInstance[3].id,
        model: "fullyrubberised",
        tyreSize: tyresSizes[3],
      },
    ]);
    console.info("Tyres created succesfully ", tyres);
    // create car brands
    const carBrandsInstance = await Brand.create(
      carBrands.map((brand) => ({
        brandName: brand,
        brandType: "car",
      }))
    );
    console.info("Car brands created succesfully ", carBrandsInstance);
    const cars = await Car.create([
      {
        brandId: carBrandsInstance[0].id,
        model: "suv",
        tyreSize: tyresSizes[0],
      },
      {
        brandId: carBrandsInstance[1].id,
        model: "sedan",
        tyreSize: tyresSizes[1],
      },
      {
        brandId: carBrandsInstance[2].id,
        model: "sedan",
        tyreSize: tyresSizes[2],
      },
      {
        brandId: carBrandsInstance[2].id,
        model: "hatchback",
        tyreSize: tyresSizes[3],
      },
    ]);
    console.info("cars created succesfully ", cars);
  } catch (err) {
    console.error("Boot script data error - ", err);
  }
};
