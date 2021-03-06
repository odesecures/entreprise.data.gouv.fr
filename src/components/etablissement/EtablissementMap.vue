<template>
  <div class="map-container">
    <div v-if="haveNoMapInfo" id="map" class="panel contains-message">
      <p class="panel__message">
        Les données de géolocalisation ne sont pas disponibles pour cet
        établissement.
      </p>
    </div>
    <div v-else-if="mapboxglSupported" id="map" ref="map" class="panel"></div>
    <div v-else id="map" class="panel contains-message">
      <p class="panel__message">
        Votre navigateur ne supporte pas WebGL et ne peut pas afficher la carte
        de l’établissement.
      </p>
    </div>
    <p>
      Géolocalisation réalisée par
      <a href="https://etalab.gouv.fr" target="blank">Etalab</a>
      via
      <a href="https://adresse.data.gouv.fr/" target="blank">
        adresse.data.gouv.fr
      </a>
    </p>
  </div>
</template>

<script>
import Vue from "vue";
import mapboxgl from "mapbox-gl";
import mapOtherMarkers from "@/components/mixins/mapOtherMarkers";
import colors from "@/components/mixins/colors";

export default {
  name: "EtablisssementSireneMap",
  mixins: [mapOtherMarkers],
  props: {
    etablissement: {
      type: Object,
      default() {
        return {};
      }
    },
    positionEtablissement: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      mapboxglSupported: mapboxgl.supported(),
      mapTilesEtalab:
        "https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json",
      mapOptions(json) {
        return {
          container: "map",
          style: json.body,
          center: this.positionEtablissement,
          zoom: 13
        };
      },
      etablissementPopup: new mapboxgl.Popup({
        closeButton: true
      })
    };
  },
  computed: {
    haveNoMapInfo() {
      if (
        this.etablissement &&
        (this.etablissement.geo_score == "0" ||
          this.etablissement.geo_score == undefined)
      )
        return true;
      return false;
    }
  },
  mounted() {
    Vue.http.get(this.mapTilesEtalab).then(json => {
      this.initMap(json);
    });
  },
  methods: {
    initMap: function(json) {
      if (this.haveNoMapInfo) return;
      let map = new mapboxgl.Map(this.mapOptions(json));
      // addOtherMarkets first so the etablissement marker will be on top
      this.addOtherMarkers(
        map,
        this.$store.getters.singlePageEtablissementSirene.siren
      );
      this.addEtablissementMarker(map);
      mapOtherMarkers.methods.addPopupContent(
        this.etablissementPopup,
        this.etablissement
      );
    },
    addEtablissementMarker(map) {
      new mapboxgl.Marker({ color: colors.red })
        .setLngLat(this.positionEtablissement)
        .setPopup(this.etablissementPopup)
        .addTo(map);
    }
  }
};
</script>

<style lang="scss" scoped>
#map {
  padding: 0;
  height: 350px;
  flex-shrink: 0;
}

.map-container {
  width: 48%;
}

@media screen and (max-width: $desktop) {
  .map-container {
    width: 100%;
  }
}

.panel__message {
  color: $color-dark-grey;
}

.mapboxgl-popup {
  max-width: 200px;
}

.contains-message {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
