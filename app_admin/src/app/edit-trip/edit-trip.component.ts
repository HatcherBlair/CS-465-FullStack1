import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from "../services/trip-data.service";

@Component({
  selector: "app-edit-trip",
  templateUrl: "./edit-trip.component.html",
  styleUrls: ["./edit-trip.component.css"],
})
export class EditTripComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit() {
    // Retreive stored trip
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something went wrong, couldn't find tripCode in localStorage");
      this.router.navigate([""]);
      return;
    }

    console.log("EditTripComponent#onInit found tripCode" + tripCode);

    // Initialize the form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ["", Validators.required],
      length: ["", Validators.required],
      start: ["", Validators.required],
      resort: ["", Validators.required],
      perPerson: ["", Validators.required],
      image: ["", Validators.required],
      description: ["", Validators.required],
    });

    console.log("EditTripComponent#onInit calling TripDataService#getTrip");

    this.tripService.getTrip(tripCode).then((data) => {
      console.log(data);

      // Get GMT datetime and convert to Date object
      const oldDate = new Date(data[0].start);

      // Adjust oldDate for timezone offset, convert it to a string, and remove the timezone information
      const [newDate] = new Date(
        oldDate.getTime() - oldDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split(".");

      // Replace start time with new start time
      data[0].start = newDate;

      // Patch form
      this.editForm.patchValue(data[0]);
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value).then((data) => {
        console.log(data);
        this.router.navigate([""]);
      });
    }
  }
}
