        <?php
            if($profile->opis !== ''){
                echo '<section class="bio">';
                    echo '<h2>Opis</h2>';
                    echo '<p class="bio__content">'.$profile->opis.'</p>';
                echo '</section>';
            }
        ?>
        <section class="informacje">
            <h2>Informacje</h2>
            <?php
                if($profile->nr_tel !== ''){
                    echo '<div class="informacje__element">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M8.26 1.289l-1.564.772c-5.793 3.02 2.798 20.944 9.31 20.944.46 0 .904-.094 1.317-.284l1.542-.755-2.898-5.594-1.54.754c-.181.087-.384.134-.597.134-2.561 0-6.841-8.204-4.241-9.596l1.546-.763-2.875-5.612zm7.746 22.711c-5.68 0-12.221-11.114-12.221-17.832 0-2.419.833-4.146 2.457-4.992l2.382-1.176 3.857 7.347-2.437 1.201c-1.439.772 2.409 8.424 3.956 7.68l2.399-1.179 3.816 7.36s-2.36 1.162-2.476 1.215c-.547.251-1.129.376-1.733.376"/></svg>';
                    echo '<span><span class="bold">Nr tel:</span> '.$profile->nr_tel.'</span>';
                    echo '</div>';
                }
                if($profile->kontakt_email !== ''){
                    echo '<div class="informacje__element">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z"/></svg>';
                    echo    '<span><span class="bold">Email:</span> '.$profile->kontakt_email.'</span>';
                    echo '</div>';
                }
                if($profile->miasto_zamieszkania !== '' && $profile->kraj_zamieszkania !== ''){
                    echo '<div class="informacje__element">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"/></svg>';
                        echo '<span><span class="bold">Mieszka w:</span> '.$profile->miasto_zamieszkania.','.$profile->kraj_zamieszkania.'</span>';
                    echo '</div>';
                }
                if($profile->szkola !== ''){
                    echo '<div class="informacje__element">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 21h-3l1-3h1l1 3zm-12.976-4.543l8.976-4.575v6.118c-1.007 2.041-5.607 3-8.5 3-3.175 0-7.389-.994-8.5-3v-6.614l8.024 5.071zm11.976.543h-1v-7.26l-10.923 5.568-11.077-7 12-5.308 11 6.231v7.769z"/></svg>';
                        echo '<span><span class="bold">Ukończył/Uczęszcza do:</span> '.$profile->szkola.'</span>';
                    echo '</div>';
                }
                if($profile->praca !== ''){
                    echo '<div class="informacje__element">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.23 15.5c-6.801 0-10.367-1.221-12.23-2.597v9.097h24v-8.949c-3.218 2.221-9.422 2.449-11.77 2.449zm1.77 2.532c0 1.087-.896 1.968-2 1.968s-2-.881-2-1.968v-1.032h4v1.032zm-14-8.541v-2.491h24v2.605c0 5.289-24 5.133-24-.114zm9-7.491c-1.104 0-2 .896-2 2v2h2v-1.5c0-.276.224-.5.5-.5h5c.276 0 .5.224.5.5v1.5h2v-2c0-1.104-.896-2-2-2h-6z"/></svg>';
                        echo '<span><span class="bold">Pracuje w:</span> '.$profile->praca.'</span>';
                    echo '</div>';
                }
                if($profile->miasto_urodzenia !== '' && $profile->kraj_urodzenia !== ''){
                    echo '<div class="informacje__element">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 24h-24v-2h1v-13c1.793-1.211 3.484-2.153 5.116-2.826.534 2.743 2.997 4.864 5.961 4.826 2.914-.037 5.314-2.167 5.814-4.855 1.636.675 3.324 1.627 5.109 2.855v13h1v2zm-14-1h4v-4h-4v4zm-5 0h4v-4h-4v4zm10 0h4v-4h-4v4zm-10-6h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm-12-3h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm-5-14c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5m1 2h-2v2h-2v2h2v2h2v-2h2v-2h-2v-2z"/></svg>';
                        echo '<span><span class="bold">Miejsce urodzenia:</span> '.$profile->miasto_urodzenia.', '.$profile->kraj_urodzenia.'</span>';
                    echo '</div>';
                }
                if($profile->dob !== ''){
                    echo '<div class="informacje__element">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M23 20v4h-22v-4h22zm-22-1v-3h22v3h-22zm20.453-9c1.256.011 2.534 1.051 2.547 2.5.012 1.38-1.176 2.5-2.625 2.5-1.028 0-1.92-.564-2.35-1.386-.43.822-1.322 1.386-2.35 1.386-1.019 0-1.903-.554-2.337-1.362-.436.808-1.319 1.362-2.338 1.362-1.019 0-1.902-.554-2.337-1.362-.435.808-1.319 1.362-2.338 1.362-1.028 0-1.919-.564-2.35-1.386-.431.822-1.322 1.386-2.35 1.386-1.449 0-2.637-1.12-2.625-2.5.013-1.449 1.292-2.489 2.546-2.5h1.454v-2.974h2v2.974h5v-5h2v5h5v-3h2v3h1.453zm-17.3-3.451c-1.897-.621-1.351-3.444.89-4.523.08 1.422 1.957 1.566 1.957 3.002 0 .602-.441 1.274-1.084 1.521.154-.509-.186-1.416-.88-1.809-.702.407-1.063 1.302-.883 1.809zm13.999-.026c-1.896-.621-1.35-3.444.891-4.523.08 1.422 1.957 1.566 1.957 3.002 0 .602-.441 1.274-1.084 1.521.153-.509-.186-1.416-.88-1.809-.702.407-1.063 1.302-.884 1.809zm-6.999-2c-1.897-.621-1.351-3.444.89-4.523.08 1.422 1.957 1.566 1.957 3.002 0 .602-.441 1.274-1.084 1.521.153-.509-.186-1.416-.88-1.809-.702.407-1.063 1.302-.883 1.809z"/></svg>';
                        echo '<span><span class="bold">Data urodzenia:</span> '.usuwacz_zer($profile->dob->format('d')).' '.tlumacz_miesiecy($profile->dob->format('M')).' '.$profile->dob->format('Y').'</span>';
                    echo '</div>';
                }
            ?>
        </section>

        <?php
            function tlumacz_miesiecy($miesiac){
                switch($miesiac){
                    case 'Jan':
                        $tlumaczenie = 'stycznia';
                        break;
                    case 'Feb':
                        $tlumaczenie = 'lutego';
                        break;
                    case 'Mar':
                        $tlumaczenie = 'marca';
                        break;
                    case 'Apr':
                        $tlumaczenie = 'kwietnia';
                        break;
                    case 'May':
                        $tlumaczenie = 'maja';
                        break;
                    case 'Jun':
                        $tlumaczenie = 'czerwca';
                        break;
                    case 'Jul':
                        $tlumaczenie = 'lipca';
                        break;
                    case 'Aug':
                        $tlumaczenie = 'sierpnia';
                        break;
                    case 'Sep':
                        $tlumaczenie = 'września';
                        break;
                    case 'Oct':
                        $tlumaczenie = 'października';
                        break;
                    case 'Nov':
                        $tlumaczenie = 'listopada';
                        break;
                    case 'Dec':
                        $tlumaczenie = 'grudnia';
                        break;
                }
                return $tlumaczenie;
            }

            function usuwacz_zer($dzien){
                switch($dzien){
                    case '01':
                        $przetworzone = '1';
                        break;
                    case '02':
                        $przetworzone = '2';
                        break;
                    case '03':
                        $przetworzone = '3';
                        break;
                    case '04':
                        $przetworzone = '4';
                        break;
                    case '05':
                        $przetworzone = '5';
                        break;
                    case '06':
                        $przetworzone = '6';
                        break;
                    case '07':
                        $przetworzone = '7';
                        break;
                    case '08':
                        $przetworzone = '8';
                        break;
                    case '09':
                        $przetworzone = '9';
                        break;
                    default:
                        $przetworzone = $dzien;
                        break;
                }
                return $przetworzone;
            }
        ?>