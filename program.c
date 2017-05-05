// Program klasycznego algorytmy genetycznego v.1.4
// ostatnia aktualizacja 2011-04-27
// CopyLeft Feliks Kurp 2011
//#include <cstdlib>
//#include <iostream>
//#include <stdio.h>
//#include <conio.h>
//#include <time.h>
//#include <math.h>

//using namespace std;

//Globalne struktury danych
    const int lp=60;           //liczba pokoleñ w eksperymencie
    int nr_pokolenia=1;        //licznik numeru pokolenia
    const float a=0.5;         //wartoæ pocz¹tkowa przestrzeni poszukiwañ
    const float b=2.5;         //wartoæ koñcowa przestrzeni poszukiwañ    
    const int N=11;            //liczba genów w chromosomie
    const unsigned int Power2N=1<<N; //definiuje Power2N jako 2 do potêgi N 
    const int pula=20;         //liczba osobników  w populacji (parzysta)
    const float pk=0.75;        //prawdopodobieñstwo krzy¿owania
    const float pm=0.01;        //prawdopodobieñstwo mutacji
    int *POPULACJA[pula];      //tablica wskaników do chromosomów populacji
    int *NOWE_POKOLENIE[pula]; //tablica wskaników do chromosomów nowego pokolenia 
    float FENOTYPY[pula];      //tablica wartoci fenotypów dla populacji chromosomów
    float DOSTOSOWANIE[pula];  //tablica wartoci funkcji dostosowania
    
//Globalne funkcje aplikacji
int *LOSUJ_CHROMOSOM(void);
//przydziela pamiêæ, a nastepnie losuje 
//bitowy chromosom zwracaj¹c do niego wskazanie
void LOSUJ_POPULACJA(void);
//losuje chromosomy ca³ej populacji pocz¹tkowej
//umieszczaj¹c wskaniki do nich w tabeli POPULACJA
int FENOTYP(int *chrom);
//oblicza wartoæ numeryczn¹ fenotypu wskazanego chromosomu
void OBLICZ_FENOTYPY(void);
//oblicza wartoci numeryczne wszystkich fenotypów
//i umieszcza je w tablicy FENOTYPY
void OBLICZ_DOSTOSOWANIE(void);
//oblicza wartoci funkcji dostosowania
//i umieszcza je w tablicy DOSTOSOWANIE
void DOSTOSOWANIE_NORMALIZACJA();
//normalizuje tablicê wartoci funkcji dostosowania
//tak, aby zawiera³a wy³¹cznie wartoci dodatnie
void UTWORZ_NOWE_POKOLENIE(void);
//przydziela pamiêæ pod przysz³e nowe pokolenie chromosomów
void RULETKA(void);
//selekcja chromosomów w tabeli POPULACJA metod¹ ko³a ruletki
void KRZYZOWANIE(void);
//operacja krzy¿owania osobników w tabeli POPULACJA
//parami z prawdopodobieñstwem pk
void MUTACJE(void);
//operacja mutacji osobników w tabeli POPULACJA
//z prawdopodobieñstwem pm

//Funkcje i zmienne globalne pomocnicze
int tablica_bazowa[4*lp]; int index_bazowy=0;
//tablica i indeks bazowych liczb losowych dla generatora rand()
void losuj_baze(void);
//losowanie liczb tablicy bazowej
int pobierz_baze(void);
//pobiera kolejn¹ liczbê z tablicy bazowej

//Funkcje globalne komunikacji z programem
void POKAZ_POPULACJE(void);
//wywietla garnitur chromosomowy aktualnej populacji
void POKAZ_FENOTYPY(void);
//wywietla fenotypy aktualnej populacji
void POKAZ_DOSTOSOWANIE(void);
//wywietla wartoci funkcji dostosowania aktualnej populacji
void POKAZ_DOSTOSOWANIE_SREDNIE(void);
//wywietla redni¹ wartoæ funkcji dostosowania w aktualnej populacji

int main(int argc, char *argv[])
{
  //klasyczny algorytm genetyczny
    losuj_baze();
    LOSUJ_POPULACJA();
      OBLICZ_FENOTYPY();
      OBLICZ_DOSTOSOWANIE();
      POKAZ_DOSTOSOWANIE_SREDNIE();
      UTWORZ_NOWE_POKOLENIE();
    while(nr_pokolenia<lp)
    {
      DOSTOSOWANIE_NORMALIZACJA();
      RULETKA();
      KRZYZOWANIE();
      MUTACJE();
      OBLICZ_FENOTYPY();
      OBLICZ_DOSTOSOWANIE();
      nr_pokolenia++;
      POKAZ_DOSTOSOWANIE_SREDNIE();
      cout<<endl;
    }
    system("PAUSE");
    return EXIT_SUCCESS;
}

void losuj_baze(void)
{
    time_t t;
    srand((unsigned)time(&t));
    for(int i=0;i<4*lp;i++)
    tablica_bazowa[i]=rand()%256;
}

int pobierz_baze(void)
{
    return tablica_bazowa[index_bazowy++];
}    
    
int power(int n)
// liczy n-t¹ nieujemn¹ potegê dwójki
{   int pow=1;
    for(int i=1;i<=N;i++)
    pow=pow*2;
    return pow;
}

int *LOSUJ_CHROMOSOM(void)
{
    int *chrom=new int[N];
    for(int i=0;i<N;i++)
    chrom[i]=rand()%2;
    return chrom;
}

int FENOTYP(int *chrom)
{
    int fen=0, rat=1;
    for(int i=0;i<N;i++)
    {fen=fen+chrom[i]*rat; rat=rat*2;}
    return fen;
}

void LOSUJ_POPULACJA(void)
{
    srand(pobierz_baze());
    for(int i=0;i<pula;i++)
    POPULACJA[i]=LOSUJ_CHROMOSOM();
}
      
void OBLICZ_FENOTYPY(void)
{
      for(int i=0;i<pula;i++)
        FENOTYPY[i]=a+(b-a)*FENOTYP(POPULACJA[i])/Power2N;          
}
           
void OBLICZ_DOSTOSOWANIE(void)
{
     float x;
     for(int i=0;i<pula;i++)
       { x=FENOTYPY[i];
         DOSTOSOWANIE[i]=(exp(x)*sin(3.1415*x)+1)/x; }
}

void DOSTOSOWANIE_NORMALIZACJA(){
  float min,max,offset;
  min=max=DOSTOSOWANIE[0];
  for(int i=1; i<pula; i++) {
    if(DOSTOSOWANIE[i]<min) min=DOSTOSOWANIE[i];
    if(DOSTOSOWANIE[i]>max) max=DOSTOSOWANIE[i];
  }
  offset=(max-min)/(N-1)-min;
  for(int i=0; i<pula; i++) DOSTOSOWANIE[i]+=offset;
}

void UTWORZ_NOWE_POKOLENIE(void)
{
     for(int i=0;i<pula;i++)
     NOWE_POKOLENIE[i]=new int[N];
}

void RULETKA(){
  float tablica_NI[pula];
  float suma_dostosowanie=0;
  for(int i=0; i<pula; i++) suma_dostosowanie+=DOSTOSOWANIE[i];
  for(int i=0; i<pula; i++) tablica_NI[i]=DOSTOSOWANIE[i]/suma_dostosowanie*Power2N;
  int losowe[pula];         //liczby losowe z przedzia³u 0...Power2N-1
  srand(pobierz_baze());
  for(int i=0; i<pula; i++) losowe[i]=rand()%Power2N;
  float ruletka[pula];      //pozycje wycinków ruletki
  float pozycja=0;
  for(int i=0; i<pula; i++){
    pozycja+=tablica_NI[i];
    ruletka[i]=pozycja;
  }
  for(int i=0; i<pula; i++){
    int j=0;
    while(losowe[i]>ruletka[j]) j++;
    for(int k=0; k<N; k++) NOWE_POKOLENIE[i][k]=POPULACJA[j][k];
  }
  for(int i=0; i<pula; i++) for(int k=0; k<N; k++) 
  POPULACJA[i][k]=NOWE_POKOLENIE[i][k];
}

     
void KRZYZOWANIE(void)
{
     srand(pobierz_baze());
     //losowanie par osobników do krzy¿owania
     int liczba_par=pula/2;
     int losowe_pary[liczba_par];
     for(int i=0;i<liczba_par;i++)
       losowe_pary[i]=rand()%100;
     //losowanie miejsc krzy¿owania dla par
     int losowe_miejsca[liczba_par];
     for(int i=0;i<liczba_par;i++)
       losowe_miejsca[i]=rand()%(N-2);
     //proces krzy¿owania genów w parach
     int pierwszy=0; //indeks pierwszego osobnika w ka¿dej parze
     int bufor;
     for(int para=0;para<liczba_par;para++)
       { if(losowe_pary[para]<pk*100)
           for(int i=losowe_miejsca[para];i<N;i++)
             { bufor=POPULACJA[pierwszy][i];
               POPULACJA[pierwszy][i]=POPULACJA[pierwszy+1][i];
               POPULACJA[pierwszy+1][i]=bufor;
             }
         pierwszy+=2;
       } 
}

void MUTACJE(void)
{
     srand(pobierz_baze());
     //losowanie genów do mutacji
     float losowe[pula];
     for(int i=0;i<pula;i++)
       losowe[i]=(rand()%100)/100.0;
     //proces krzy¿owania genów w parach
     int miejsce_mutacji;
     for(int i=0;i<pula;i++)
       if(losowe[i]<pm)
       { miejsce_mutacji=rand()%N;
         if(POPULACJA[i][miejsce_mutacji]==0)
            POPULACJA[i][miejsce_mutacji]=1;
            else POPULACJA[i][miejsce_mutacji]=0;
       }
}

void POKAZ_POPULACJE(void)
{      cout<<endl<<"Garnitur chromosomowy populacji"<<endl;
       cout<<"gen chromosom";
       for(int i=0;i<pula;i++)
         {cout<<endl<<i<<" - ";
         for(int j=N; j>0; j--) 
          cout<<POPULACJA[i][j-1];
         }cout<<endl;
}
void POKAZ_FENOTYPY(void)
{      if(nr_pokolenia==1)
         {cout<<endl<<"Nr pokolenia - Fenotypy aktualnej populacji"<<endl<<endl;
          cout<<nr_pokolenia<<" - ";}
       for(int j=0;j<pula;j++)
         cout<<FENOTYPY[j]<<" ";
       cout<<endl;
}
void POKAZ_DOSTOSOWANIE(void)
{      if(nr_pokolenia==1)
         cout<<endl<<"Nr pokolenia   Wartosci funkcji dostosowania"<<endl;
       cout<<endl<<nr_pokolenia<<"   ";
       for(int j=0;j<pula;j++)
         cout<<DOSTOSOWANIE[j]<<" ";
       cout<<endl;
}

void POKAZ_DOSTOSOWANIE_SREDNIE(void)
{      if(nr_pokolenia==1)
         cout<<endl<<"Nr pokolenia   Srednia wartosc funkcji dostosowania"<<endl;
       cout<<endl<<nr_pokolenia<<"   ";
       float srednia=0;
       for(int j=0;j<pula;j++)
         srednia+=DOSTOSOWANIE[j];
       srednia/=pula;
       cout<<srednia<<" ";
       cout<<endl;
}
