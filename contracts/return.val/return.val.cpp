#include <eosio/eosio.hpp>
using namespace eosio;

CONTRACT returnvalues : public contract {
   public:
      using contract::contract;

      struct Result {
         uint64_t value;
         uint64_t control;
      };

      [[eosio::action]]
      Result withreturn( uint64_t value ){
         return Result{
            .value = value,
            .control = 4321
         };
      }

      [[eosio::action, eosio::readonly]]
      Result readreturn( uint64_t value ){
         return Result{
            .value = value,
            .control = 3456
         };
      }

      [[eosio::action]]
      void without( ){

      }

      [[eosio::action]]
      Result inlinedval( uint64_t value ){
         action(
            permission_level{get_self(), "active"_n},
            get_self(),
            "withreturn"_n,
            std::make_tuple(value+1)
         ).send();

         return Result{
            .value = value,
            .control = 9876
         };
      }
};