<?php
class Post{
    public $postid;
    public $idautora;
    public $autor;
    public $prof;
    public $data;
    public $widocznosc;
    public $lokalizacja;
    public $tresc;
    public $lajki;
    public $serca;
    public $komentarze;
    public $obrazek;

    public function __construct($postid,$idautora,$autor,$prof,$data,$widocznosc,$lokalizacja,$tresc,$lajki,$serca,$komentarze,$obrazek)
    {
        $this->postid = $postid;
        $this->idautora = $idautora;
        $this->autor = $autor;
        $this->prof = $prof;
        $this->data = new DateTime($data);
        $this->widocznosc = $widocznosc;
        $this->lokalizacja = $lokalizacja;
        $this->tresc = $tresc;
        $this->lajki = $lajki;
        $this->serca = $serca;
        $this->komentarze = $komentarze;
        $this->obrazek = $obrazek;        
    }
    public function get_ago(){
        $secondsPerMinute = 60;
        $secondsPerHour = 3600;
        $secondsPerDay = 86400;
        $secondsPerWeek = 604800;
        $secondsPerMonth = 2592000;
        $secondsPerYear = 31104000;
        // finds the past in datetime
        $past = strtotime($this->data->format('Y-m-d H:i:s'));
        // finds the current datetime
        $now = strtotime('now');
        
        // creates the "time ago" string. This always starts with an "about..."
        $timeAgo = "";
        
        // finds the time difference
        $timeDifference = $now - $past;
        
        // less than 29secs
        if($timeDifference <= 29) {
          $timeAgo = "Przed chwilą";
        }
        // more than 29secs and less than a minute
        else if($timeDifference > 29 && $timeDifference <= 60) {
          $seconds = $timeDifference;  
          $timeAgo = $seconds." s";
        }
        // between 1min and 1 hour
        else if($timeDifference > 60 &&
          $timeDifference <= (($secondsPerMinute * 60))
        ) {
          $minutes = floor($timeDifference / $secondsPerMinute);
          $timeAgo = $minutes." min";
        }
        // between 1 hour and 1 day
        else if(
          $timeDifference > (($secondsPerMinute * 60))
          &&
          $timeDifference < (($secondsPerHour * 24))
        ) {
          $hours = floor($timeDifference / $secondsPerHour);
          $timeAgo = $hours." godz.";
        }
        // between 1 day and 1 week
        else if(
          $timeDifference > (
            ($secondsPerHour * 24)
          )
          &&
          $timeDifference <= 
            $secondsPerWeek
        ) {
          $days = floor($timeDifference / $secondsPerDay);
          $timeAgo = $days." dni";
        }
        // between 1 week and 1 month
        else if(
          $timeDifference > $secondsPerWeek
          &&
          $timeDifference <= $secondsPerMonth
        ) {
          $weeks = floor($timeDifference / $secondsPerWeek);
          $timeAgo = $weeks." tyg";
        }
        // between 1 month and 1 year
        else if(
          $timeDifference > $secondsPerMonth
          &&
          $timeDifference <= $secondsPerYear
        ) {
          $months =floor($timeDifference / $secondsPerMonth);
          $timeAgo = $months." mies";
        }
        // between 1 year and 2 years
        else if(
          $timeDifference > $secondsPerYear && $timeDifference <= ($secondsPerYear * 2)
        ) {
            $timeAgo = "1 rok";
        }
        else if($timeDifference > ($secondsPerYear * 2))
        {
          $years = floor($timeDifference / $secondsPerYear);
          $timeAgo = $years." lat";
        }
        return $timeAgo;
    }

    public function get_date_tooltip(){
        return $this->data->format('d.m.Y \o \g\o\d\z\i\n\i\e H:i');
    }

    public function get_reactions(){
        return $this->lajki + $this->serca;
    }

    public function get_privacy_icon(){
        if($this->widocznosc === 'public'){
            $icon = 'M12.02 0c6.614.011 11.98 5.383 11.98 12 0 6.623-5.376 12-12 12-6.623 0-12-5.377-12-12 0-6.617 5.367-11.989 11.981-12h.039zm3.694 16h-7.427c.639 4.266 2.242 7 3.713 7 1.472 0 3.075-2.734 3.714-7m6.535 0h-5.523c-.426 2.985-1.321 5.402-2.485 6.771 3.669-.76 6.671-3.35 8.008-6.771m-14.974 0h-5.524c1.338 3.421 4.34 6.011 8.009 6.771-1.164-1.369-2.059-3.786-2.485-6.771m-.123-7h-5.736c-.331 1.166-.741 3.389 0 6h5.736c-.188-1.814-.215-3.925 0-6m8.691 0h-7.685c-.195 1.8-.225 3.927 0 6h7.685c.196-1.811.224-3.93 0-6m6.742 0h-5.736c.062.592.308 3.019 0 6h5.736c.741-2.612.331-4.835 0-6m-12.825-7.771c-3.669.76-6.671 3.35-8.009 6.771h5.524c.426-2.985 1.321-5.403 2.485-6.771m5.954 6.771c-.639-4.266-2.242-7-3.714-7-1.471 0-3.074 2.734-3.713 7h7.427zm-1.473-6.771c1.164 1.368 2.059 3.786 2.485 6.771h5.523c-1.337-3.421-4.339-6.011-8.008-6.771';
        }
        else if($this->widocznosc === 'private'){
            $icon = 'M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z';
        }
        return $icon;
    }
}
?>