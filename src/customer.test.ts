import {
  Customer,
  calculateFrequentRenterPoints,
  calculateRentalCost,
} from "./customer";
import { Rental } from "./rental";
import { Movie } from "./movie";

describe("Customer", () => {
  it("should test", () => {
    const customer = new Customer("Bob");
    customer.addRental(new Rental(new Movie("Jaws", Movie.REGULAR), 2));
    customer.addRental(new Rental(new Movie("Golden Eye", Movie.REGULAR), 3));
    customer.addRental(
      new Rental(new Movie("Short New", Movie.NEW_RELEASE), 1)
    );
    customer.addRental(new Rental(new Movie("Long New", Movie.NEW_RELEASE), 2));
    customer.addRental(new Rental(new Movie("Bambi", Movie.CHILDRENS), 3));
    customer.addRental(new Rental(new Movie("Toy Story", Movie.CHILDRENS), 4));

    const expected =
      "" +
      "Rental Record for Bob\n" +
      "\tJaws\t2.0\n" +
      "\tGolden Eye\t3.5\n" +
      "\tShort New\t3.0\n" +
      "\tLong New\t6.0\n" +
      "\tBambi\t1.5\n" +
      "\tToy Story\t3.0\n" +
      "Amount owed is 19.0\n" +
      "You earned 7 frequent renter points";

    expect(customer.statement()).toBe(expected);
  });
});

describe("calculateRentalCost", () => {
  test.each([
    {
      rental: new Rental(new Movie("Jaws", Movie.REGULAR), 2),
      expectedCost: 2.0,
    },
    {
      rental: new Rental(new Movie("Golden Eye", Movie.REGULAR), 3),
      expectedCost: 3.5,
    },
    {
      rental: new Rental(new Movie("Short New", Movie.NEW_RELEASE), 1),
      expectedCost: 3.0,
    },
    {
      rental: new Rental(new Movie("Long New", Movie.NEW_RELEASE), 2),
      expectedCost: 6.0,
    },
    {
      rental: new Rental(new Movie("Bambi", Movie.CHILDRENS), 3),
      expectedCost: 1.5,
    },
    {
      rental: new Rental(new Movie("Toy Story", Movie.CHILDRENS), 4),
      expectedCost: 3.0,
    },
  ])("should test", ({ rental, expectedCost }) => {
    expect(calculateRentalCost(rental)).toEqual(expectedCost);
  });
});

describe("calculateFrequentRenterPoints", () => {
  test("It works", () => {
    const order = [
      new Rental(new Movie("Jaws", Movie.REGULAR), 2),
      new Rental(new Movie("Golden Eye", Movie.REGULAR), 3),
      new Rental(new Movie("Short New", Movie.NEW_RELEASE), 1),
      new Rental(new Movie("Long New", Movie.NEW_RELEASE), 2),
      new Rental(new Movie("Bambi", Movie.CHILDRENS), 3),
      new Rental(new Movie("Toy Story", Movie.CHILDRENS), 4),
    ];

    expect(calculateFrequentRenterPoints(order)).toEqual(7);
  });
});
