import React, {useRef, useState, useEffect} from 'react';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {FlatGrid} from 'react-native-super-grid';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import _ from 'lodash';

import ButtonGroup from './components/ButtonGroup/ButtonGroup';
import {ButtonProps} from './components/ButtonGroup/Types';
import {MultiSelectItemProps} from './components/MultiSelect/Types';
import {RadioGroupSelectItemProps} from './components/RadioGroupSelect/Types';
import RadioGroupSelect from './components/RadioGroupSelect/RadioGroupSelect';
import SheetModal from './components/SheetModal/SheetModal';
import ThumbnailCard from './components/ThumbnailCard/ThumbnailCard';
import MultiSelect from './components/MultiSelect/MultiSelect';
import SearchInput from './components/SearchInput/SearchInput';
import ErrorCard from './components/ErrorCard/ErrorCard';
import {ThumbnailCardProps} from './components/ThumbnailCard/Types';

import {Genre, getList, ListResponse, Video} from './api/Thumbnail';

//Constans for sorting
const SORT_BY_NAME_A_Z: string = '1';
const SORT_BY_NAME_Z_A: string = '2';
const SORT_BY_ARTIST_A_Z: string = '3';
const SORT_BY_ARTIST_Z_A: string = '4';

//Sort options
const radioButtonsData: RadioGroupSelectItemProps[] = [
  {
    id: SORT_BY_NAME_A_Z,
    name: 'Sort By Name (A-Z)',
  },
  {
    id: SORT_BY_NAME_Z_A,
    name: 'Sort By Name (Z-A)',
  },
  {
    id: SORT_BY_ARTIST_A_Z,
    name: 'Sort By Singer (A-Z)',
  },
  {
    id: SORT_BY_ARTIST_Z_A,
    name: 'Sort By Singer (Z-A)',
  },
];

//Constants for screen status
const LOADING: number = 0;
const DATA_EXIST: number = 1;
const DATA_NOT_EXIST: number = 2;
const ERROR: number = 3;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  //Modal screen refs
  const typeFilterScreen = useRef<React.ElementRef<typeof SheetModal>>(null);
  const yearFilterScreen = useRef<React.ElementRef<typeof SheetModal>>(null);
  const sortingScreen = useRef<React.ElementRef<typeof SheetModal>>(null);

  //Filter and sort values
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>();
  const [textFilter, setTextFilter] = useState<string>();

  //Screen status value
  const [screenStatus, setScreenStatus] = useState<number>(LOADING);

  //Data values
  const [typeList, setTypeList] = useState<MultiSelectItemProps[]>([]);
  const [yearList, setYearList] = useState<MultiSelectItemProps[]>([]);
  const [allData, setAllData] = useState<ListResponse | null>();
  const [filteredData, setFilteredData] = useState<ThumbnailCardProps[]>([]);

  /**
   * Render thumbnail card
   * @param param0 { ThumbnailCardProps }
   * @returns
   */
  const renderThumbnailItem = ({item}: {item: ThumbnailCardProps}) => (
    <ThumbnailCard {...item} />
  );

  /**
   * Getting data from api and set data, screen status values
   */
  const getData = () => {
    setScreenStatus(LOADING);
    getList()
      .then((data: ListResponse | null) => {
        if (data) {
          setAllData(data);
        } else {
          setScreenStatus(DATA_NOT_EXIST);
        }
      })
      .catch(() => {
        setScreenStatus(ERROR);
      });
  };

  /**
   * Create values from raw data
   */
  const setLists = () => {
    if (allData) {
      //Convert genres to filter data type
      setTypeList(
        allData.genres.map((item: Genre) => {
          const multiselectItem: MultiSelectItemProps = {
            id: String(item.id),
            name: item.name,
            value: item.id,
          };
          return multiselectItem;
        }),
      );

      //Export years from video datas
      const yearList: number[] = [];
      allData.videos.forEach((video: Video) => {
        if (yearList.indexOf(video.release_year) === -1) {
          yearList.push(video.release_year);
        }
      });

      //Sort years by value and convert to filter data type
      setYearList(
        yearList
          .sort((x: number, y: number) => (x > y ? -1 : 1))
          .map((year: number) => {
            const multiselectItem: MultiSelectItemProps = {
              id: String(year),
              name: String(year),
              value: year,
            };
            return multiselectItem;
          }),
      );

      //Convert video datas to thumbnail card type
      setFilteredData(
        allData.videos.map((video: Video) => {
          const thumbnailObject: ThumbnailCardProps = {
            id: String(video.id),
            title: video.artist,
            subTitle: video.title,
            imageUrl: video.image_url,
          };
          return thumbnailObject;
        }),
      );

      //Set screen status to data exist
      setScreenStatus(DATA_EXIST);
    }
  };

  /**
   * Sort thumbnail data array by selected sort type
   * @param array ThumbnailCardProps[]
   * @returns
   */
  const sortArray = (array: ThumbnailCardProps[]): ThumbnailCardProps[] => {
    let sortedArray: ThumbnailCardProps[];

    switch (selectedSort) {
      case SORT_BY_NAME_A_Z:
        sortedArray = _.orderBy(array, ['subTitle'], ['asc']);
        break;
      case SORT_BY_NAME_Z_A:
        sortedArray = _.orderBy(array, ['subTitle'], ['desc']);
        break;
      case SORT_BY_ARTIST_A_Z:
        sortedArray = _.orderBy(array, ['title'], ['asc']);
        break;
      case SORT_BY_ARTIST_Z_A:
        sortedArray = _.orderBy(array, ['title'], ['desc']);
        break;
      default:
        return array;
    }

    return sortedArray;
  };

  /**
   * Filter raw video array by selected filters and convert to thumbnail data type
   */
  const applyFilter = () => {
    if (allData) {
      let filteredArray = allData.videos
        .filter(
          (video: Video) =>
            //Filter by type
            (selectedTypes.length
              ? selectedTypes.indexOf(String(video.genre_id)) > -1
              : true) &&
            //Filter by year
            (selectedYears.length
              ? selectedYears.indexOf(String(video.release_year)) > -1
              : true) &&
            //Filter by text
            (textFilter
              ? String(video.artist).toLowerCase().indexOf(textFilter) > -1 ||
                String(video.title).toLowerCase().indexOf(textFilter) > -1
              : true),
        )
        //Covert to thumbnail data type
        .map((video: Video) => {
          const thumbnailObject: ThumbnailCardProps = {
            id: String(video.id),
            title: video.artist,
            subTitle: video.title,
            imageUrl: video.image_url,
          };
          return thumbnailObject;
        });

      //Sort filtered data
      filteredArray = sortArray(filteredArray);

      setFilteredData(filteredArray);
    }
  };

  //Apply sort to filtered data on filter change
  const applySort = () => {
    setFilteredData(sortArray(filteredData));
  };

  //Get data from api on init
  useEffect(getData, []);

  //Set useful lists for components after rawData initialized
  useEffect(setLists, [allData]);

  //Apply filter to data on change filters
  useEffect(applyFilter, [selectedTypes, selectedYears, textFilter]);

  //Apply sort on change sort type
  useEffect(applySort, [selectedSort]);

  //Filter and sorting button group
  const filterAndSortButtons: ButtonProps[] = [
    {
      title: 'Types',
      icon: {
        name: 'filter',
        type: 'antdesign',
        size: 15,
        color: '#4a4a4a',
      },
      onPress: () => {
        typeFilterScreen.current?.open();
      },
    },
    {
      title: 'Years',
      icon: {
        name: 'filter',
        type: 'antdesign',
        size: 15,
        color: '#4a4a4a',
      },
      onPress: () => {
        yearFilterScreen.current?.open();
      },
    },
    {
      title: 'Sort',
      icon: {
        name: 'sort',
        size: 15,
        color: '#4a4a4a',
      },
      onPress: () => {
        sortingScreen.current?.open();
      },
    },
  ];

  /**
  //  * Loading screen component that used for waiting
   * @returns ReactNode
   */
  const LoadingScreen = () => (
    <SafeAreaView style={styles.loading}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );

  /**
  //  * Error screen component that used for connection error
   * @returns ReactNode
   */
  const ErrorScreen = () => (
    <SafeAreaView style={styles.loading}>
      <ErrorCard title="An error occured on connection." onRetry={getData} />
    </SafeAreaView>
  );

  /**
  //  * Screen component that used for no data on api
   * @returns ReactNode
   */
  const NotExistScreen = () => (
    <SafeAreaView style={styles.loading}>
      <ErrorCard title="There is no data on server." onRetry={getData} />
    </SafeAreaView>
  );

  // //Return component by screen status
  switch (screenStatus) {
    case LOADING:
      return <LoadingScreen />;
    case DATA_NOT_EXIST:
      return <NotExistScreen />;
    case ERROR:
      return <ErrorScreen />;
    case DATA_EXIST:
    default:
      return (
        <SafeAreaView
          style={{
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            ...styles.backgroundStyle,
          }}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <View style={styles.backgroundStyle}>
            {/* Search component */}
            <SearchInput
              placeholder="Type Here..."
              onChangeText={(text: string = '') => {
                setTextFilter(text.toLowerCase());
              }}
            />
            {/* Button group that is trigger for filter and sort modals */}
            <ButtonGroup buttons={filterAndSortButtons} />
            {/* Type filter modal component */}
            <SheetModal ref={typeFilterScreen} title="Filter By Type">
              <MultiSelect
                items={typeList}
                selectedItems={selectedTypes}
                onChange={(selectedTypes: MultiSelectItemProps[]) => {
                  setSelectedTypes(
                    selectedTypes.map((type: MultiSelectItemProps) => type.id),
                  );
                }}
              />
            </SheetModal>
            {/* Year filter modal component */}
            <SheetModal ref={yearFilterScreen} title="Filter By Year">
              <MultiSelect
                items={yearList}
                selectedItems={selectedYears}
                onChange={(selectedYears: MultiSelectItemProps[]) => {
                  setSelectedYears(
                    selectedYears.map((year: MultiSelectItemProps) => year.id),
                  );
                }}
              />
            </SheetModal>
            {/* Sort type selection modal component */}
            <SheetModal ref={sortingScreen} title="Sort">
              <RadioGroupSelect
                items={radioButtonsData}
                selectedItem={selectedSort}
                onChange={(selectedItem: RadioGroupSelectItemProps) => {
                  setSelectedSort(selectedItem.id);
                }}
              />
            </SheetModal>
            {/* If no data matching with filters, shows error card.*/}
            {/* Otherwise show card list  */}
            {filteredData && filteredData.length ? (
              <FlatGrid
                itemDimension={130}
                data={filteredData}
                style={styles.listStyle}
                spacing={10}
                renderItem={renderThumbnailItem}
                keyExtractor={item => item.id}
                maxToRenderPerBatch={10}
                initialNumToRender={10}
              />
            ) : (
              <ErrorCard title="There is no data for your filters." />
            )}
          </View>
        </SafeAreaView>
      );
  }
};

const styles = StyleSheet.create({
  backgroundStyle: {
    height: '100%',
  },
  loading: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  listStyle: {
    marginTop: 10,
    flex: 1,
  },
});

export default App;
