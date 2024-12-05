import { SubTaskListComponent } from '../sub-task-list/sub-task-list.component';
import { InputTextComponent } from '../input-text/input-text.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from '../select/select.component';
import { ColumnService } from '../../services/column.service';
import { DateComponent } from '../date/date.component';
import { LoaderService } from '../../services/loader.service';
import { ModalComponent } from './modal.component';
import { Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockColumnService: jasmine.SpyObj<ColumnService>;
  let mockLoaderService: jasmine.SpyObj<LoaderService>;

  beforeEach(async () => {
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    mockColumnService = jasmine.createSpyObj('ColumnService', ['updateColumn']);
    mockLoaderService = jasmine.createSpyObj('LoaderService', ['show', 'hide']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        FormsModule,
        InputTextComponent,
        TextAreaComponent,
        DateComponent,
        SelectComponent,
        SubTaskListComponent,
        ModalComponent
      ],
      providers: [
        { provide: ToastrService, useValue: mockToastrService },
        { provide: ColumnService, useValue: mockColumnService },
        { provide: LoaderService, useValue: mockLoaderService },
        { provide: Firestore, useValue: {} } // Mock Firestore
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.column = {
      id: '123',
      title: 'To Do',
      tasks: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#createTask', () => {
    it('should show an error if title or description is missing', async () => {
      component.task.title = '';
      component.task.description = '';
      await component.createTask();

      expect(mockToastrService.error).toHaveBeenCalledWith('Fields are required.');
      expect(mockColumnService.updateColumn).not.toHaveBeenCalled();
    });

    it('should call updateColumn if all fields are provided', async () => {
      component.task = {
        title: 'Test Task',
        description: 'Test Description',
        dueDate: new Date(),
        priority: 'Medium',
        status: 'To Do',
        assignee: 'John Doe',
        subtasks: []
      };

      mockColumnService.updateColumn.and.returnValue(Promise.resolve());
      await component.createTask();

      expect(mockLoaderService.show).toHaveBeenCalled();
      expect(mockColumnService.updateColumn).toHaveBeenCalledWith(component.column);
      expect(mockToastrService.success).toHaveBeenCalledWith('New task created successfully !');
      expect(mockLoaderService.hide).toHaveBeenCalled();
    });

    it('should show an error if updateColumn fails', async () => {
      component.task = {
        title: 'Test Task',
        description: 'Test Description'
      };

      mockColumnService.updateColumn.and.returnValue(Promise.reject('Update failed'));

      await component.createTask();

      expect(mockToastrService.error).toHaveBeenCalledWith('Error during creation of new task !');
      expect(mockLoaderService.hide).toHaveBeenCalled();
    });
  });

  describe('#loadUsers', () => {
    it('should load users from Firestore', async () => {
      const usersMock = [
        { uid: '1', displayName: 'John Doe' },
        { uid: '2', displayName: 'Jane Doe' }
      ];
      spyOn(component, 'loadUsers').and.callFake(() => {
        component.users = usersMock;
        return Promise.resolve();
      });

      await component.ngOnInit();
      expect(component.users).toEqual(usersMock);
    });
  });

  describe('#addSubtask', () => {
    it('should add a new subtask', () => {
      component.task.subtasks = [];
      component.addSubtask();

      expect(component.task.subtasks.length).toBe(1);
      expect(component.task.subtasks[0]).toEqual({ title: '', completed: false });
    });
  });

  describe('#removeSubtask', () => {
    it('should remove a subtask', () => {
      component.task.subtasks = [{ title: 'Subtask 1', completed: false }];
      component.removeSubtask(0);

      expect(component.task.subtasks.length).toBe(0);
    });
  });

  describe('#close', () => {
    it('should emit closeModal', () => {
      spyOn(component.closeModal, 'emit');
      component.close();
      expect(component.closeModal.emit).toHaveBeenCalled();
    });
  });
});
