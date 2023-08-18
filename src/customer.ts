import { Movie } from "./movie";
import { Rental } from "./rental";

export class Customer {
  private name: string;
  private rentals: Rental[] = [];

  public constructor(name: string) {
    this.name = name;
  }

  public addRental(arg: Rental) {
    this.rentals.push(arg);
  }

  public getName(): string {
    return this.name;
  }

  public statement(): string {
    let totalCost: number = 0;
    let frequentRenterPoints: number = 0;
    let statementOutput = "Rental Record for " + this.getName() + "\n";

    for (const rental of this.rentals) {
      let rentalCost = calculateRentalCost(rental);

      // add frequent renter points
      frequentRenterPoints++;
      // add bonus for a two day new release rental
      if (
        rental.getMovie().getPriceCode() === Movie.NEW_RELEASE &&
        rental.getDaysRented() > 1
      )
        frequentRenterPoints++;

      // show figures for this rental
      statementOutput +=
        "\t" +
        rental.getMovie().getTitle() +
        "\t" +
        rentalCost.toFixed(1) +
        "\n";
      totalCost += rentalCost;
    }

    // add footer lines
    statementOutput += "Amount owed is " + totalCost.toFixed(1) + "\n";
    statementOutput +=
      "You earned " + frequentRenterPoints + " frequent renter points";

    return statementOutput;
  }
}

export function calculateRentalCost(rental: Rental): number {
  let rentalCost = 0;

  switch (rental.getMovie().getPriceCode()) {
    case Movie.REGULAR:
      rentalCost += 2;
      if (rental.getDaysRented() > 2) {
        rentalCost += (rental.getDaysRented() - 2) * 1.5;
      }
      break;
    case Movie.NEW_RELEASE:
      rentalCost += rental.getDaysRented() * 3;
      break;
    case Movie.CHILDRENS:
      rentalCost += 1.5;
      if (rental.getDaysRented() > 3) {
        rentalCost += (rental.getDaysRented() - 3) * 1.5;
      }
      break;
  }

  return rentalCost;
}
