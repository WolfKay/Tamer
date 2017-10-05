import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecsComponent } from './recs.component';

describe('RecsComponent', () => {
  let component: RecsComponent;
  let fixture: ComponentFixture<RecsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
