<template>
  <div 
    class="ingredient"
  >
    <ImageWithNumber
      :name="mainItemName" 
      :number="numberOfIngredients"
      class="ingredient__image"
    />
    <div class="prices">
      <template v-for="name of itemNames">
        <input 
          :key="name" 
          :value="getInputModel(name)"
          class="ingredient"
          @input="updateItemPrice($event, name)"
        >
      </template>
    </div>
  </div>
</template>

<script>
import ImageWithNumber from '~/components/utils/ImageWithNumber.vue';

export default {
  name: 'Ingredient',
  components: {
    ImageWithNumber
  },
  props: {
    itemNames: {
      type: Array,
      default: () => [],
    },

    numberOfIngredients: {
      type: String,
      default: '0',
    },

    mainItemName: {
      type: String,
      default: '',
    },

    getItemByName: {
      type: Function, // (itemName: string) => ResponseModel | undefined,
      default: () => {},
    },

    updateItemByName: {
      type: Function, // (item: ResponseModel) => void;
      default: () => {},
    },
  },
  computed: {
    getInputModel: {
      get() {
        return (itemName) => {
          const item = this.getItemByName(itemName);

          return item?.sellPriceMin || 0;
        };
      },
      set(newValue) {
        console.log('Set ', newValue);
        return (itemName) => {
          
        };
      }
    }
  },
  methods: {
    updateItemPrice(event, itemName) {
      console.log('Shieat', itemName);

      const item = this.getItemByName(itemName);

      this.updateItemByName({
        itemName,
        item: {
          ...item,
          sellPriceMin: Number(event.target.value) || 0,
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>