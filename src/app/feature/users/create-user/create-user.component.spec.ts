import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUserComponent } from './create-user.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersService } from '@feature/users/create-user/shared/services/users/users.service';
import { of } from 'rxjs';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let usersService: jasmine.SpyObj<UsersService>;


  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UsersService', ['createUser']);

    await TestBed.configureTestingModule({
      declarations: [ CreateUserComponent ],
      imports: [FormsModule, RouterTestingModule],
      providers: [{ provide: UsersService, useValue: spy }],
    }).compileComponents();

    usersService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createUser when onSubmit is triggered', () => {
    component.name = 'John Doe';
    component.job = 'Developer';

    usersService.createUser.and.returnValue(of({ name: 'John Doe', job: 'Developer' }));

    component.onSubmit();

    expect(usersService.createUser).toHaveBeenCalledWith('John Doe', 'Developer');
  });

});
