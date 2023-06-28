import { BsGenderMale, BsGenderFemale, BsGenderAmbiguous } from 'react-icons/bs';
import styles from './services.module.css';
const iconClass = styles.services__icon_small;

const data = {
    uniwersalne: [
        {
            name: 'masaż relaksacyjny',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg nawilżający skórę',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'peeling ciała',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg relaksujący z aromaterapią',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg tonizujący skórę',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg odżywczy dla skóry',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg regenerujący skórę',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg oczyszczający skórę',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg ujędrniający skórę',
            icon: <BsGenderAmbiguous className={iconClass} />
        }
    ],
    włosy: [
        {
            name: 'strzyżenie damskie',
            icon: <BsGenderFemale className={iconClass} />
        },
        {
            name: 'strzyżenie męskie',
            icon: <BsGenderMale className={iconClass} />
        },
        {
            name: 'koloryzacja włosów',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'prostowanie włosów',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'modelowanie fryzur',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'odżywianie i regeneracja włosów',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabiegi pielęgnacyjne dla skóry głowy',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'ekstensje i przedłużanie włosów',
            icon: <BsGenderAmbiguous className={iconClass} />
        }
    ],
    twarz: [
        {
            name: 'zabieg oczyszczający twarzy',
            icon: <BsGenderFemale className={iconClass} />
        },
        {
            name: 'zabieg pielęgnacyjny dla mężczyzn',
            icon: <BsGenderMale className={iconClass} />
        },
        {
            name: 'masaż relaksacyjny twarzy',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg liftingujący twarz',
            icon: <BsGenderFemale className={iconClass} />
        },
        {
            name: 'zabieg regenerujący skorę',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg nawilżający twarz',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg oczyszczający z użyciem mikrodermabrazji',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg redukujący trądzik',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg liftingujący okolice oczu',
            icon: <BsGenderFemale className={iconClass} />
        }
    ],
    ciało: [
        {
            name: 'masaż pleców',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg odchudzający dla kobiet',
            icon: <BsGenderFemale className={iconClass} />
        },
        {
            name: 'zabieg pielęgnacyjny dla mężczyzn',
            icon: <BsGenderMale className={iconClass} />
        },
        {
            name: 'zabieg nawilżający skórę tułowia',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg relaksacyjny dla pleców',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg ujędrniający skórę tułowia',
            icon: <BsGenderFemale className={iconClass} />
        },
        {
            name: 'zabieg modelujący sylwetkę',
            icon: <BsGenderMale className={iconClass} />
        },
        {
            name: 'zabieg oczyszczający plecy',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg regenerujący skórę tułowia',
            icon: <BsGenderAmbiguous className={iconClass} />
        }
    ],
    dłonie: [
        {
            name: 'manicure klasyczny',
            icon: <BsGenderFemale className={iconClass} />
        },
        {
            name: 'manicure hybrydowy',
            icon: <BsGenderFemale className={iconClass} />
        },
        {
            name: 'zabieg regenerujący skórę dłoni',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg parafinowy',
            icon: <BsGenderFemale className={iconClass} />
        },
        {
            name: 'manicure francuski',
            icon: <BsGenderFemale className={iconClass} />
        },
        {
            name: 'zabieg pielęgnacyjny dla dłoni i paznokci',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'manicure zdobiony',
            icon: <BsGenderFemale className={iconClass} />
        },
        {
            name: 'zabieg odżywczy dla skóry dłoni',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg peelingujący dla dłoni',
            icon: <BsGenderAmbiguous className={iconClass} />
        }
    ],
    stopy: [
        {
            name: 'pedicure klasyczny',
            icon: <BsGenderFemale className={iconClass} />
        },
        {
            name: 'pedicure hybrydowy',
            icon: <BsGenderFemale className={iconClass} />
        },
        {
            name: 'zabieg regenerujący skórę stóp',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg parafinowy',
            icon: <BsGenderFemale className={iconClass} />
        },
        {
            name: 'pedicure francuski',
            icon: <BsGenderFemale className={iconClass} />
        },
        {
            name: 'zabieg pielęgnacyjny dla stóp i paznokci',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'pedicure zdobiony',
            icon: <BsGenderFemale className={iconClass} />
        },
        {
            name: 'zabieg odżywczy dla skóry stóp',
            icon: <BsGenderAmbiguous className={iconClass} />
        },
        {
            name: 'zabieg peelingujący dla stóp',
            icon: <BsGenderAmbiguous className={iconClass} />
        }
    ]
}

export default data;