import React, { useEffect, useState } from 'react';
import { YMaps, Placemark, Map } from 'react-yandex-maps';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { StoresNames } from '@/stores/StoresNames';

function YandexMap(props) {
  const points = toJS(props[StoresNames.PointStore].points);

  useEffect(() => {
    props.services.pointService.getPoints();
  }, []);

  if (!points?.length) return null;
  return (
    <YMaps>
      <Map style={{ height: `${props.height}px`, width: `${props.width}px` }} defaultState={{ zoom: 5, center: points.length && [points[0].x, points[0].y] }}>
        {points.map(point => {
          return (
            <Placemark
              properties={{
                iconContent:point.id
              }}
              instanceRef={inst => {
                inst?.events?.add('click', () => {
                  props.onClick(point);
                });
              }}
              geometry={[point.x, point.y]}
            />
          );
        })}
      </Map>
    </YMaps>
  );
}

export default inject('services', StoresNames.PointStore)(observer(YandexMap));
