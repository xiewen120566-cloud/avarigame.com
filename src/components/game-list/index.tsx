import { Locale } from '@/i18n/routing';
import { Games } from '@/services/data';
import { Grid, GridItem } from '@chakra-ui/react';

import GameItem from '../game-item';

interface Props {
  data: Games;
  spanIndex: number;
  locale: Locale;
  channel?: string;
}

export default function GameList({ data, locale, channel, spanIndex }: Props) {
  return (
    <Grid
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(3, 1fr)"
      gap={{ base: 3, md: 4, lg: 6 }}
    >
      {data?.map((game, index) => {
        const span = index === spanIndex ? 2 : 1;
        return (
          <GridItem key={index} rowSpan={span} colSpan={span}>
            <GameItem data={game} locale={locale} channel={channel} />
          </GridItem>
        );
      })}
    </Grid>
  );
}
