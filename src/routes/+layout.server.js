import { supabase } from "$lib/supabaseClient";

export async function load() {
  const { data:customers } = await supabase.from("customer_list").select();
  const { data:blends } = await supabase.from('blends').select();
  const { data:greenCoffee } = await supabase.from('green_coffees').select();
  const { data:orders } = await supabase.from('orders').select();
  return {
    customerData: customers ?? [],
    blendData: blends ?? [],
    greenCoffeeData: greenCoffee ?? [],
    orderData: orders ?? [],
  };
}