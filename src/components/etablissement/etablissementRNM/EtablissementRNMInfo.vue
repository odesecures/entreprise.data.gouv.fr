<template>
  <div class="company__panel panel">
    <h4>Informations RNM</h4>
    <div class="company__item">
      <div class="company__item-key">Domaine d’activité (NAR20)</div>
      <div class="company__item-value">
        {{ resultRNM.NAR20 | ifEmptyShowPlaceholder }}
      </div>
    </div>
    <div class="company__item">
      <div class="company__item-key">Activité d’Artisanat (NAFA)</div>
      <div class="company__item-value">
        {{ resultRNM.GEST_LIBELLE_CODE_NAFA | ifEmptyShowPlaceholder }}
      </div>
    </div>
    <div class="company__item">
      <div class="company__item-key">Qualification</div>
      <div class="company__item-value">
        {{ resultRNM.DIR_QA_QUALIFICATION | ifEmptyShowPlaceholder }}
      </div>
    </div>
    <div class="company__item">
      <div class="company__item-key">Date Immatriculation RNM</div>
      <div class="company__item-value">
        {{ resultRNM.ENT_ACT_DATE_IMMAT_RM | ifEmptyShowPlaceholder }}
      </div>
    </div>
    <div class="company__item">
      <div class="company__item-key">Date Radiation</div>
      <div class="company__item-value">
        {{ resultRNM.ENT_ACT_DATE_RADIATION | ifEmptyShowPlaceholder }}
      </div>
    </div>
    <div class="company__item">
      <div class="company__item-key">Code Forme Juridique</div>
      <div class="company__item-value">
        {{ resultRNM.ENT_ACT_FORME_JURIDIQUE | ifEmptyShowPlaceholder }}
      </div>
    </div>
  </div>
</template>

<script>
import Filters from "@/components/mixins/filters";

export default {
  name: "EtablissementRNMInfo",
  mixins: [Filters],
  computed: {
    resultRNM() {
      return this.$store.getters.RNMData;
    }
  }
};
</script>
