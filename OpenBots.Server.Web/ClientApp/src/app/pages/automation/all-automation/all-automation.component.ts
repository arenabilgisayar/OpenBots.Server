import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from '../../../interfaces/paginateInstance';
import { DialogService } from '../../../@core/dialogservices/dialog.service';
import { NbToastrService } from '@nebular/theme';
import { ItemsPerPage } from '../../../interfaces/itemsPerPage';
import { HelperService } from '../../../@core/services/helper.service';
import { AutomationService } from '../automation.service';

@Component({
  selector: 'ngx-all-automation',
  templateUrl: './all-automation.component.html',
  styleUrls: ['./all-automation.component.scss'],
})
export class AllAutomationComponent implements OnInit {
  showAllprocess: any = [];
  processId: any = [];
  sortDir = 1;
  toggle: boolean;
  feild_name: any = [];
  page: Page = {};
  show_perpage_size: boolean = false;
  per_page_num: any = [];
  get_perPage: boolean = false;
  isDeleted = false;
  showTotalPage: [];
  itemsPerPage: ItemsPerPage[] = [];
  searchedValue: string;
  filterOrderBy: string;

  constructor(
    protected router: Router,
    private dialogService: DialogService,
    private toastrService: NbToastrService,
    private helperService: HelperService,
    protected automationService: AutomationService
  ) {}

  ngOnInit(): void {
    this.page.pageNumber = 1;
    this.page.pageSize = 5;
    this.pagination(this.page.pageNumber, this.page.pageSize);
    this.itemsPerPage = this.helperService.getItemsPerPage();
  }

  gotodetail(id) {
    this.router.navigate(['/pages/automation/get-automation-id'], {
      queryParams: { id: id },
    });
  }
  gotoedit(id) {
    this.router.navigate([`/pages/automation/edit/${id}`]);
  }

  goto_jobs(id) {
    this.router.navigate(['/pages/job/list'], {
      queryParams: { AutomationID: id },
    });
  }

  gotoadd() {
    this.router.navigate(['/pages/automation/add']);
  }

  openDialog(ref, id) {
    this.processId = id;
    this.dialogService.openDialog(ref);
  }

  deleteUser(ref) {
    this.isDeleted = true;
    this.automationService.deleteProcess(this.processId).subscribe(
      () => {
        ref.close();
        this.isDeleted = false;
        this.toastrService.success('You have successfully Delete ');
        this.pagination(this.page.pageNumber, this.page.pageSize);
      },
      () => (this.isDeleted = false)
    );
  }

  sort(filter_value, vale) {
    // const skip = (this.page.pageNumber - 1) * this.page.pageSize;
    // this.feild_name = filter_val + '+' + vale;
    // this.automationService
    //   .getAllJobsOrder(this.page.pageSize, skip, this.feild_name)
    //   .subscribe((data: any) => {
    //     this.showAllprocess = data.items;
    //     this.page.totalCount = data.totalCount;
    //   });
    const top = this.page.pageSize;
    const skip = (this.page.pageNumber - 1) * this.page.pageSize;
    this.filterOrderBy = `${filter_value}+${vale}`;
    if (this.searchedValue) {
      if (this.filterOrderBy) {
        this.automationService
          .getFilterPagination(
            top,
            skip,
            this.filterOrderBy,
            this.searchedValue
          )
          .subscribe((data: any) => {
            this.showAllprocess = data.items;
            this.page.totalCount = data.totalCount;
          });
      } else {
        this.automationService
          .getFilterPagination(top, skip, 'createdOn+desc', this.searchedValue)
          .subscribe((data: any) => {
            this.showAllprocess = data.items;
            this.page.totalCount = data.totalCount;
          });
      }
    } else if (this.filterOrderBy) {
      this.automationService
        .getFilterPagination(top, skip, this.filterOrderBy)
        .subscribe((data: any) => {
          this.showAllprocess = data.items;
          this.page.totalCount = data.totalCount;
        });
    } else {
      this.automationService
        .getFilterPagination(top, skip, 'createdOn+desc')
        .subscribe((data: any) => {
          this.showAllprocess = data.items;
          this.page.totalCount = data.totalCount;
        });
    }
  }

  per_page(val) {
    // this.per_page_num = val;
    // this.page.pageSize = val;
    // this.show_perpage_size = true;
    // const skip = (this.page.pageNumber - 1) * this.page.pageSize;
    // this.automationService
    //   .getAllProcess(this.page.pageSize, skip)
    //   .subscribe((data: any) => {
    //     this.showAllprocess = data.items;
    //     this.page.totalCount = data.totalCount;
    //   });
    this.per_page_num = val;
    this.show_perpage_size = true;
    this.page.pageSize = val;
    const skip = (this.page.pageNumber - 1) * this.per_page_num;
    if (this.searchedValue) {
      if (this.filterOrderBy) {
        this.automationService
          .getFilterPagination(
            this.page.pageSize,
            skip,
            this.filterOrderBy,
            this.searchedValue
          )
          .subscribe((data: any) => {
            this.showAllprocess = data.items;
            this.page.totalCount = data.totalCount;
          });
      } else {
        this.automationService
          .getFilterPagination(
            this.page.pageSize,
            skip,
            'createdOn+desc',
            this.searchedValue
          )
          .subscribe((data: any) => {
            this.showAllprocess = data.items;
            this.page.totalCount = data.totalCount;
          });
      }
    } else if (this.filterOrderBy) {
      this.automationService
        .getFilterPagination(this.page.pageSize, skip, this.filterOrderBy)
        .subscribe((data: any) => {
          this.showAllprocess = data.items;
          this.page.totalCount = data.totalCount;
        });
    } else {
      this.automationService
        .getFilterPagination(this.page.pageSize, skip, 'createdOn+desc')
        .subscribe((data: any) => {
          this.showAllprocess = data.items;
          this.page.totalCount = data.totalCount;
        });
    }
  }

  // get_AllJobs(top, skip) {
  //   this.feild_name = 'MachineName';
  //   this.automationService.getAllProcess(top, skip).subscribe((data: any) => {
  //     this.showAllprocess = data.items;
  //     this.page.totalCount = data.totalCount;
  //   });
  // }

  onSortClick(event, filter_val) {
    let target = event.currentTarget,
      classList = target.classList;
    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      let sort_set = 'desc';
      this.sort(filter_val, sort_set);
      this.sortDir = -1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      let sort_set = 'asc';
      this.sort(filter_val, sort_set);
      this.sortDir = 1;
    }
  }
  pageChanged(event) {
    this.page.pageNumber = event;
    this.pagination(event, this.page.pageSize);
  }

  pagination(pageNumber, pageSize) {
    // if (this.show_perpage_size == false) {
    //   const top: number = pageSize;
    //   const skip = (pageNumber - 1) * pageSize;
    //   this.get_AllJobs(top, skip);
    // } else if (this.show_perpage_size == true) {
    //   const top: number = this.per_page_num;
    //   const skip = (pageNumber - 1) * this.per_page_num;
    //   this.get_AllJobs(top, skip);
    // }
    const top = pageSize;
    this.page.pageSize = pageSize;
    const skip = (pageNumber - 1) * pageSize;
    if (this.searchedValue) {
      if (this.filterOrderBy) {
        this.automationService
          .getFilterPagination(
            top,
            skip,
            this.filterOrderBy,
            this.searchedValue
          )
          .subscribe((data: any) => {
            this.showAllprocess = data.items;
            this.page.totalCount = data.totalCount;
          });
      } else {
        this.automationService
          .getFilterPagination(top, skip, 'createdOn+desc', this.searchedValue)
          .subscribe((data: any) => {
            this.showAllprocess = data.items;
            this.page.totalCount = data.totalCount;
          });
      }
    } else if (this.filterOrderBy) {
      this.automationService
        .getFilterPagination(top, skip, this.filterOrderBy)
        .subscribe((data: any) => {
          this.showAllprocess = data.items;
          this.page.totalCount = data.totalCount;
        });
    } else {
      this.automationService
        .getFilterPagination(top, skip, 'createdOn+desc')
        .subscribe((data: any) => {
          this.showAllprocess = data.items;
          this.page.totalCount = data.totalCount;
        });
    }
  }

  trackByFn(index: number, item: unknown): number {
    if (!item) return null;
    return index;
  }
  searchValue(event) {
    const skip = (this.page.pageNumber - 1) * this.page.pageSize;
    if (event.target.value.length >= 2) {
      this.searchedValue = event.target.value;
      if (this.filterOrderBy) {
        this.automationService
          .getFilterPagination(
            this.page.pageSize,
            skip,
            this.filterOrderBy,
            this.searchedValue
          )
          .subscribe((data: any) => {
            this.showAllprocess = data.items;
            this.page.totalCount = data.totalCount;
          });
      } else {
        this.automationService
          .getFilterPagination(
            this.page.pageSize,
            skip,
            'createdOn+desc',
            this.searchedValue
          )
          .subscribe((data: any) => {
            this.showAllprocess = data.items;
            this.page.totalCount = data.totalCount;
          });
      }
    } else if (!event.target.value.length) {
      this.searchedValue = null;
      if (this.filterOrderBy) {
        this.automationService
          .getFilterPagination(this.page.pageSize, skip, this.filterOrderBy)
          .subscribe((data: any) => {
            this.showAllprocess = data.items;
            this.page.totalCount = data.totalCount;
          });
      } else
        this.automationService
          .getFilterPagination(this.page.pageSize, skip, 'createdOn+desc')
          .subscribe((data: any) => {
            this.showAllprocess = data.items;
            this.page.totalCount = data.totalCount;
          });
    }
  }
}
