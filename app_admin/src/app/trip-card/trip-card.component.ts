import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";

import { Trip } from "../models/trip";
import { ConfirmDeleteComponent } from "../confirm-delete/confirm-delete.component";
import { TripDataService } from "../services/trip-data.service";

@Component({
  selector: "app-trip-card",
  templateUrl: "./trip-card.component.html",
  styleUrls: ["./trip-card.component.css"],
})
export class TripCardComponent {
  @Input("trip") trip: any;
  constructor(
    private router: Router,
    private tripService: TripDataService,
    private dialog: MatDialog
  ) {}

  @Output() tripDeleted = new EventEmitter<void>();

  // Navigates to edit-trip screen
  private editTrip(trip: Trip): void {
    console.log("Inside TripListingComponent#editTrip");
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(["edit-trip"]);
  }

  // Displays a confirmation to delete a trip and deletes a trip
  private openConfirmationDialog(trip: Trip): void {
    // Confirmation
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);

    // Deletes the trip
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(`Deleting trip ${trip.code}`);
        this.tripService.deleteTrip(trip.code);

        // Fire an event to tell trip-listing to refresh the list of trips
        this.tripDeleted.emit();
      }
    });
  }
}
