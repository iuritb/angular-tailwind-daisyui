import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AxiosService } from 'src/app/services/axios.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCog6Tooth } from '@ng-icons/heroicons/outline';


@Component({
  selector: 'app-dialog-chat-configuration',
  templateUrl: './dialog-chat-configuration.component.html',
  styleUrls: ['./dialog-chat-configuration.component.scss'],
  standalone: true, // Certifique-se de que ele é standalone
  imports: [
    CommonModule,
    FormsModule,
    NgIconComponent,
  ],
  viewProviders: [
    provideIcons({
      heroCog6Tooth,
    }),
  ],
})
export class DialogChatConfigurationComponent implements OnInit {
  showParamsModal: boolean = false;

  azureParams: any = {
    search_params: {},
    llm_params: {},
  };

  private axiosInstance;

  constructor(private axiosService: AxiosService) {
    this.axiosInstance = this.axiosService.getAxiosInstance();
  }

  ngOnInit() {
    this.loadAzureParams(); // Carregar parâmetros ao iniciar
  }

  toggleDialogParams() {
    this.showParamsModal = !this.showParamsModal;
  }

  loadAzureParams() {
    this.axiosInstance.get('/v1/params').then((response) => {
      this.azureParams = response.data;
      console.log('Parâmetros carregados:', this.azureParams);
    }).catch((error) => {
      console.error('Erro ao carregar os parâmetros:', error);
    });
  }

  updateParams() {
    this.axiosInstance.put('/v1/params', this.azureParams).then(() => {
      console.log('Parâmetros atualizados com sucesso');
      this.toggleDialogParams(); // Fechar o modal após atualização

      console.log('Parâmetros enviados ao backend:', this.azureParams);
    }).catch((error) => {
      console.error('Erro ao atualizar os parâmetros:', error);
    });
  }
}
