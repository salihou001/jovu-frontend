import { TaskColumnComponent } from "../../shared/components/task-column/task-column.component";
import { ColumnService } from "../../shared/services/column.service";
import { LoaderService } from "../../shared/services/loader.service";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, OnInit, inject } from '@angular/core';
import { Column } from "../../shared/models/task.model";

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [DragDropModule, TaskColumnComponent],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent implements OnInit {
  columns!: Column[] ;
  private columnService: ColumnService = inject(ColumnService);
  private loaderSrv: LoaderService = inject(LoaderService);

  async ngOnInit(): Promise<void> {
    try {
      this.loaderSrv.show();
      this.columns = await this.columnService.getColumnsWithTasks();
    } catch (error) {
      console.error('Erreur lors de la récupération des colonnes :', error);
    }finally { this.loaderSrv.hide(); }
  }
}
