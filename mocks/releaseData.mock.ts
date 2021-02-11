const allArtistsReleaseData = [
  {
    id: '111122',
    name: 'Ed Sheeran',
    spotifyId: '6eUKZXaKkcviH0Ku9w2n3V',
    genres: ['pop', 'uk pop'],
    releases: [
      {
        title: 'Divide',
        upc: '190295851330',
        artists: ['111122'],
        label: {
          id: '222122',
          name: 'Asylum Records',
          distributor: 'Warner Music Group',
          region: 'US',
        },
        type: 'album',
        release_date: '2017-03-03',
        track_count: 13,
      },
    ],
  },
  {
    id: '111123',
    name: 'Lil Silva',
    spotifyId: '2Kv0ApBohrL213X9avMrEn',
    genres: ['bass music', 'future garage', 'uk funky', 'vogue'],
    releases: [
      {
        title: 'Jimi',
        upc: '191018954376',
        artists: ['111123'],
        label: {
          id: '222123',
          name: 'Harvest Records',
          distributor: 'Capitol Music Group',
          region: 'US',
        },
        type: 'album',
        release_date: '2016-05-13',
        track_count: 6,
      },
      {
        title: 'Work',
        upc: '5050580590649',
        artists: ['111123', '111223'],
        label: {
          id: '222123',
          name: 'Harvest Records',
          distributor: 'Capitol Music Group',
          region: 'US',
        },
        type: 'single',
        release_date: '2013-03-01',
        track_count: 1,
      },
    ],
  },
  {
    id: '111223',
    name: 'Banks',
    spotifyId: '2xe8IXgCTpwHE3eA9hTs4n',
    genres: [
      'alternative r&b',
      'dance pop',
      'electropop',
      'indie poptimism',
      'indie r&b',
      'indietronica',
      'pop',
      'tropical house',
      'vapor soul',
    ],
    releases: [
      {
        title: 'The Altar',
        upc: '00602547762931',
        artists: ['111223'],
        label: {
          id: '222123',
          name: 'Harvest Records',
          distributor: 'Capitol Music Group',
          region: 'US',
        },
        type: 'album',
        release_date: '2016-05-13',
        track_count: 13,
      },
      {
        title: 'Goddess',
        upc: '00602537546671',
        artists: ['111223'],
        label: {
          id: '222123',
          name: 'Harvest Records',
          distributor: 'Capitol Music Group',
          region: 'US',
        },
        type: 'album',
        release_date: '2014-01-01',
        track_count: 14,
      },
      {
        title: 'Work',
        upc: '5050580590649',
        artists: ['111123', '111223'],
        label: {
          id: '222123',
          name: 'Harvest Records',
          distributor: 'Capitol Music Group',
          region: 'US',
        },
        type: 'single',
        release_date: '2013-03-01',
        track_count: 1,
      },
    ],
  },
  {
    id: '111333',
    name: 'Years & Years',
    spotifyId: '5vBSrE1xujD2FXYRarbAXc',
    genres: ['dance pop', 'gauze pop', 'pop', 'post-teen pop', 'tropical house', 'uk pop'],
    releases: [
      {
        title: 'Palo Santo (Deluxe)',
        upc: '00602577485695',
        artists: ['111333'],
        label: {
          id: '222126',
          name: 'Polydor Records',
          distributor: 'Universal Music Group',
          region: 'UK',
        },
        type: 'album',
        release_date: '2019-02-14',
        track_count: 16,
      },
    ],
  },
  {
    id: '111334',
    name: 'Best Coast',
    spotifyId: '5YkBrE0wF8cAlq3GCOw5Eu',
    genres: [
      'folk-pop',
      'indie pop',
      'indie rock',
      'indie surf',
      'indietronica',
      'la indie',
      'metropopolis',
      'modern rock',
      'noise pop',
      'nu gaze',
    ],
    releases: [
      {
        title: 'California Nights',
        upc: '00602547232786',
        artists: ['111334'],
        label: {
          id: '222123',
          name: 'Harvest Records',
          distributor: 'Capitol Music Group',
          region: 'US',
        },
        type: 'album',
        release_date: '2015-05-04',
        track_count: 12,
      },
    ],
  },
  {
    id: '111338',
    name: 'Hayley Kiyoko',
    spotifyId: '3LjhVl7GzYsza1biQjTpaN',
    genres: ['dance pop', 'electropop', 'indie poptimism', 'pop', 'post-teen pop'],
    releases: [
      {
        title: 'Expectations',
        upc: '075679881090',
        artists: ['111338'],
        label: {
          id: '222128',
          name: 'Atlantic Records',
          distributor: 'Empire',
          region: 'US',
        },
        type: 'album',
        release_date: '2018-03-30',
        track_count: 13,
      },
    ],
  },
  {
    id: '111339',
    name: 'Kim Petras',
    spotifyId: '',
    genres: ['dance pop', 'electropop', 'escape room', 'indie poptimism', 'pop', 'post-teen pop', 'transpop'],
    releases: [],
  },
  {
    id: '111400',
    name: 'SOPHIE',
    spotifyId: '5a2w2tgpLwv26BYJf2qYwu',
    genres: ['art pop', 'electropop', 'escape room', 'hyperpop', 'indietronica', 'pop', 'transpop'],
    releases: [],
  },
  {
    id: '111401',
    name: 'Dorian Electra',
    spotifyId: '202HZzqKvPsMHcbwnDZx7u',
    genres: ['art pop', 'electropop', 'escape room', 'hyperpop', 'strut', 'transpop'],
    releases: [],
  },
];

const artistsFilteredByUpcAndSingleType = [
  {
    id: '111123',
    name: 'Lil Silva',
    spotifyId: '2Kv0ApBohrL213X9avMrEn',
    genres: ['bass music', 'future garage', 'uk funky', 'vogue'],
    releases: [
      {
        title: 'Work',
        upc: '5050580590649',
        artists: ['111123', '111223'],
        label: {
          id: '222123',
          name: 'Harvest Records',
          distributor: 'Capitol Music Group',
          region: 'US',
        },
        type: 'single',
        release_date: '2013-03-01',
        track_count: 1,
      },
    ],
  },
  {
    id: '111223',
    name: 'Banks',
    spotifyId: '2xe8IXgCTpwHE3eA9hTs4n',
    genres: [
      'alternative r&b',
      'dance pop',
      'electropop',
      'indie poptimism',
      'indie r&b',
      'indietronica',
      'pop',
      'tropical house',
      'vapor soul',
    ],
    releases: [
      {
        title: 'Work',
        upc: '5050580590649',
        artists: ['111123', '111223'],
        label: {
          id: '222123',
          name: 'Harvest Records',
          distributor: 'Capitol Music Group',
          region: 'US',
        },
        type: 'single',
        release_date: '2013-03-01',
        track_count: 1,
      },
    ],
  },
];

export { allArtistsReleaseData, artistsFilteredByUpcAndSingleType };
