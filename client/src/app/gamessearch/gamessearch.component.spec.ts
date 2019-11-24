import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamessearchComponent } from './gamessearch.component';

describe('GamessearchComponent', () => {
  let component: GamessearchComponent;
  let fixture: ComponentFixture<GamessearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamessearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamessearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
