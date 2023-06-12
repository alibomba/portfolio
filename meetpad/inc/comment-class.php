<?php
    class Comment{
        public $komid;
        public $parentid;
        public $idautora;
        public $autor;
        public $prof;
        public $tresc;
        public $data;
        public $lajki;

        public function __construct($komid,$parentid,
        $idautora,$autor,$prof,$tresc,$data,$lajki)
        {
            $this->komid = $komid;
            $this->parentid = $parentid;
            $this->idautora = $idautora;
            $this->autor = $autor;
            $this->prof = $prof;
            $this->tresc = $tresc;
            $this->data = $data;
            $this->lajki = $lajki;
        }

        public function get_ago(){
            $secondsPerMinute = 60;
            $secondsPerHour = 3600;
            $secondsPerDay = 86400;
            $secondsPerWeek = 604800;
            $secondsPerMonth = 2592000;
            $secondsPerYear = 31104000;
            // finds the past in datetime
            $past = strtotime($this->data);
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



    }

?>