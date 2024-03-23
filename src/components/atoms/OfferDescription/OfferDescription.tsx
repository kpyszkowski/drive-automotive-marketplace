import type { OfferDescriptionProps } from './OfferDescription.types'
import styles from './OfferDescription.module.css'
import { remark } from 'remark'
import html from 'remark-html'

// TODO: fetch from API, parse on server
const getContent = async () => {
  const parsedContent = await remark()
    .use(html)
    .process(
      `
# Mercedes-Benz AMG GT Coupe

## Opis:
Mercedes-Benz AMG GT Coupe to flagowy model niemieckiego producenta luksusowych samochodów. Oferuje on niezrównane połączenie elegancji, wyrafinowania i nowoczesnej technologii.

## Cechy:
- Silniki wysokowydajne, oferujące doskonałe osiągi
- Luksusowe wnętrze z najwyższej jakości materiałów
- Zaawansowane systemy bezpieczeństwa i asystencji kierowcy
- Innowacyjne rozwiązania technologiczne, takie jak systemy multimedialne i bezprzewodowe połączenie z urządzeniami mobilnymi
- Wyjątkowy komfort jazdy i doskonała stabilność

## Specyfikacje:
- Silniki: Benzynowe i diesel
- Pojemność bagażnika: XX litrów
- Moc: Od XXX do XXX koni mechanicznych
- Przyspieszenie 0-100 km/h: X.X sekundy
- Średnie zużycie paliwa: X.X litrów na 100 km

## Cena:
Cena bazowa: XXX XXX złotych
(ceny mogą się różnić w zależności od regionu i opcji dodatkowych)
`,
    )
  return parsedContent.toString()
}
export const OfferDescription = async (props: OfferDescriptionProps) => {
  const { ...restProps } = props
  const content = await getContent()

  return (
    <div
      data-testid="offer-description"
      {...restProps}
    >
      <article
        className={styles.wrapper}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
