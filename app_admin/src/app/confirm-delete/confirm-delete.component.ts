import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-confirm-delete",
  templateUrl: "./confirm-delete.component.html",
  styleUrls: ["./confirm-delete.component.css"],
})
export class ConfirmDeleteComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmDeleteComponent>) {}

  close(confirm: boolean): void {
    this.dialogRef.close(confirm);
  }
}
