import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule aqui

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { ConteudoComponent } from './views/conteudo/conteudo.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { ModalMenuComponent } from './components/layout/modal-menu/modal-menu.component';
import { MainContentComponent } from './components/ui/main-content/main-content.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ChatComponent } from './components/layout/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConteudoComponent,
    NavbarComponent,
    SidebarComponent,
    ModalMenuComponent,
    MainContentComponent,
    FooterComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // Adicione o FormsModule aqui
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
