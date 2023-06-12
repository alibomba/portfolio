<?php
    class Account{
        public $userid;
        public $imie;
        public $nazwisko;
        public $email;
        public $dob;
        public $data_dolaczenia;
        public $profilowe;
        public $znajomi;
        public $opis;
        public $nr_tel;
        public $kontakt_email;
        public $miasto_zamieszkania;
        public $kraj_zamieszkania;
        public $szkola;
        public $praca;
        public $miasto_urodzenia;
        public $kraj_urodzenia;
        public $dwuetapowa;
        public $kod_z_maila;
        public $unread_notis;
        public function full_name(){
            return $this->imie.' '.$this->nazwisko;
        }
        public function wspolni_znajomi($widz,$con){
            // ids assignment
            $idwidza = $widz->userid;
            $thisid = $this->userid;

            // znajomi tego obiektu
        
            $query = "SELECT zapraszajacy FROM zaproszenia_do_znaj WHERE stan='zaakceptowane' AND zaproszony='$thisid'";
                if($result = $con->query($query)){
                    $array = $result->fetch_all(MYSQLI_ASSOC);
                    $thiszapraszajacy = [];
                    foreach($array as $element){
                        $thiszapraszajacy[] = $element['zapraszajacy'];
                    }
                }
                else{
                    echo 'Błąd bazy danych nr '.$con->connect_errno;
                    exit();
                }

                $query = "SELECT zaproszony FROM zaproszenia_do_znaj WHERE stan='zaakceptowane' AND zapraszajacy='$thisid'";
                if($result = $con->query($query)){
                    $array = $result->fetch_all(MYSQLI_ASSOC);
                    $thiszaproszeni = [];
                    foreach($array as $element){
                        $thiszaproszeni[] = $element['zaproszony'];
                    }
                }
                $thisznajomi = array_merge($thiszapraszajacy,$thiszaproszeni);



            // znajomi przegladajacego
            $query = "SELECT zapraszajacy FROM zaproszenia_do_znaj WHERE stan='zaakceptowane' AND zaproszony='$idwidza'";
                if($result = $con->query($query)){
                    $array = $result->fetch_all(MYSQLI_ASSOC);
                    $widzzapraszajacy = [];
                    foreach($array as $element){
                        $widzzapraszajacy[] = $element['zapraszajacy'];
                    }
                }
                else{
                    echo 'Błąd bazy danych nr '.$con->connect_errno;
                    exit();
                }

                $query = "SELECT zaproszony FROM zaproszenia_do_znaj WHERE stan='zaakceptowane' AND zapraszajacy='$idwidza'";
                if($result = $con->query($query)){
                    $array = $result->fetch_all(MYSQLI_ASSOC);
                    $widzzaproszeni = [];
                    foreach($array as $element){
                        $widzzaproszeni[] = $element['zaproszony'];
                    }
                }
                $widzznajomi = array_merge($widzzapraszajacy,$widzzaproszeni);


            // sprawdzenie wspolnych znajomych
            $wspolniznajomi = array_intersect($thisznajomi,$widzznajomi);
            
            return $wspolniznajomi;
        }

        public function znajomi($con){
            $thisid = $this->userid;
            $query = "SELECT zapraszajacy FROM zaproszenia_do_znaj WHERE stan='zaakceptowane' AND zaproszony='$thisid'";
                if($result = $con->query($query)){
                    $array = $result->fetch_all(MYSQLI_ASSOC);
                    $thiszapraszajacy = [];
                    foreach($array as $element){
                        $thiszapraszajacy[] = $element['zapraszajacy'];
                    }
                }
                else{
                    echo 'Błąd bazy danych nr '.$con->connect_errno;
                    exit();
                }

                $query = "SELECT zaproszony FROM zaproszenia_do_znaj WHERE stan='zaakceptowane' AND zapraszajacy='$thisid'";
                if($result = $con->query($query)){
                    $array = $result->fetch_all(MYSQLI_ASSOC);
                    $thiszaproszeni = [];
                    foreach($array as $element){
                        $thiszaproszeni[] = $element['zaproszony'];
                    }
                }
                $thisznajomi = array_merge($thiszapraszajacy,$thiszaproszeni);

                return $thisznajomi;
            
        }


        public function __construct($userid,$imie,$nazwisko,$email,$dob,$data_dolaczenia,$profilowe,$znajomi,$opis,$nr_tel,$kontakt_email,$miasto_zamieszkania,$kraj_zamieszkania,$szkola,$praca,$miasto_urodzenia,$kraj_urodzenia,$dwuetapowa,$kod_z_maila,$unread_notis){
            $this->userid = $userid;
            $this->imie = $imie;
            $this->nazwisko = $nazwisko;
            $this->email = $email;
            $this->dob = new DateTime($dob);
            $this->data_dolaczenia = new DateTime($data_dolaczenia);
            $this->profilowe = $profilowe;
            $this->znajomi = $znajomi;
            $this->opis = $opis;
            $this->nr_tel = $nr_tel;
            $this->kontakt_email = $kontakt_email;
            $this->miasto_zamieszkania = $miasto_zamieszkania;
            $this->kraj_zamieszkania = $kraj_zamieszkania;
            $this->szkola = $szkola;
            $this->praca = $praca;
            $this->miasto_urodzenia = $miasto_urodzenia;
            $this->kraj_urodzenia = $kraj_urodzenia;
            $this->dwuetapowa = $dwuetapowa;
            $this->kod_z_maila = $kod_z_maila;
            $this->unread_notis = $unread_notis;
        }
    }
?>