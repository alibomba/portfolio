import { PrismaClient } from "@prisma/client";
import randomArrElement from "./randomArrElement";
import randomNumber from "./randomNumber";
import randomFutureDate from "./randomFutureDate";

const prisma = new PrismaClient();

const titles = [
    'Lorem ipsum dolor',
    'Sit amet, consectetur',
    'Elit, sed do eius',
    'Incididunt ut',
    'Magna aliqua, ut enim',
    'Ad minim veniam',
    'Quis nostrud exer'
];

async function projectSeeder(howMany: number) {
    for (let i = 0; i <= howMany; i++) {
        await prisma.project.create({
            data: {
                title: randomArrElement(titles),
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dictum urna eget lorem aliquet, id ultricies risus vehicula. Suspendisse enim nisi, cursus aliquet molestie nec, congue quis sem. Donec nulla neque, dignissim nec arcu eu, rhoncus consequat leo. Vivamus dapibus at erat a sollicitudin. Vestibulum pulvinar est eu lectus vestibulum tristique. Curabitur imperdiet nisi magna, nec porttitor enim ornare non. Praesent tellus tortor, suscipit vel viverra sed, lacinia vitae orci. Curabitur feugiat pretium tellus interdum scelerisque.

                Quisque sit amet bibendum arcu.Donec mauris dolor, sollicitudin ut rutrum ut, efficitur vel est.Sed nec ipsum dolor.Vivamus pellentesque tortor id suscipit facilisis.Suspendisse nulla orci, efficitur sed aliquam vel, tincidunt et lectus.Pellentesque maximus ultricies lacus sed consequat.Mauris mollis facilisis odio id suscipit.Duis efficitur nec neque quis pellentesque.Aenean eget tellus at libero auctor fringilla quis eu lorem.Curabitur pulvinar nisl augue, vel luctus elit iaculis quis.Vestibulum lectus eros, tincidunt vitae mauris a, dignissim pulvinar ligula.Aliquam tincidunt elit ac porttitor rhoncus.Vestibulum tincidunt tempus volutpat.Integer at augue ex.In maximus elit at mi sollicitudin consequat.Curabitur bibendum metus eu rutrum euismod.
                
                Curabitur varius in sem id dictum.Duis ut suscipit turpis.Suspendisse et arcu mauris.In ut erat elementum, luctus lacus vel, volutpat massa.Donec nibh lacus, volutpat a condimentum non, semper id lorem.Morbi maximus malesuada nisl, eu tincidunt purus ornare pretium.Nunc eget vehicula ligula.Integer convallis ipsum vestibulum urna imperdiet rutrum.Sed mattis malesuada diam eu aliquet.Praesent elementum tortor at risus tincidunt sodales.Sed a lobortis quam, ac faucibus justo.Proin dui ipsum, sagittis eget mi quis, euismod gravida sem.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                
                Aliquam erat volutpat.Aliquam erat volutpat.Sed porta, ligula at consequat rhoncus, ante diam luctus felis, id interdum odio ligula non lorem.Nam metus felis, porttitor eu massa et, ornare faucibus libero.Pellentesque malesuada, ligula ac mollis cursus, lorem turpis dapibus arcu, non volutpat erat mauris vel turpis.Aenean lacinia nunc id enim tristique sodales.Nullam tincidunt, tortor nec dapibus pulvinar, libero urna venenatis quam, non suscipit ante elit nec augue.Donec vel massa vel est tempor molestie eget ac neque.Fusce mi eros, commodo a sapien ac, scelerisque fringilla nunc.Nam luctus nisl eu nunc tincidunt facilisis.Cras nec felis dolor.Vivamus vel vestibulum odio.Proin sapien dui, tristique et mi vel, rhoncus luctus enim.
                
                Cras eu tortor sit amet mi consequat auctor.Mauris congue at enim a semper.Donec faucibus, lorem vitae porta consequat, tortor mi placerat nulla, lobortis ultricies felis lectus sit amet ex.Nulla facilisi.Maecenas eu urna bibendum, pharetra justo non, luctus erat.Pellentesque faucibus dui in hendrerit consequat.Morbi non est nec enim efficitur molestie.Ut vitae vulputate dolor, vitae blandit velit.Sed quis volutpat nunc.`,
                image: `${randomNumber(1, 5).toString()}.webp`,
                date: randomFutureDate()
            }
        })
    }
}

export default projectSeeder;