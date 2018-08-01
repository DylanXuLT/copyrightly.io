import { Component, OnInit } from '@angular/core';
import { ErrorMessageService } from '../../error-handler/error-message.service';
import { Web3Service } from '../../util/web3.service';
import { RegistryContractService } from '../registry-contract.service';
import { Manifestation } from '../manifestation';

@Component({
  selector: 'app-registry-search',
  templateUrl: './registry-search.component.html',
  styleUrls: ['./registry-search.component.css']
})
export class RegistrySearchComponent implements OnInit {
  manifestation = new Manifestation();

  constructor(private web3Service: Web3Service,
              private registryContractService: RegistryContractService,
              private errorMessageService: ErrorMessageService) {}

  ngOnInit(): void { }

  setStatus(status) {
    this.errorMessageService.showErrorMessage(status);
  }

  getManifestation(hash: string) {
    this.registryContractService.getManifestation(hash)
      .subscribe((manifestation: Manifestation) => {
        this.manifestation = manifestation;
        if (!this.manifestation.title) {
          this.setStatus('Content hash not found, unregistered');
        }
      }, error => {
        this.setStatus(error);
      });
  }
}
