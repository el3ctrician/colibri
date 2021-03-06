--! @file example_8.vhd
--! @author el3ctrician (elbadriahmad@gmail.com)
--! @version 0.1
--! @date 2020-07-10
--! 
--! core description can be added here without using the @details and @brief
--! another description of the core is also ok
entity arith_counter_bcd is
	generic (
		DIGITS : positive														--! Number of BCD digits
	);
	port (
    --! system clock
		clk : in	std_logic;
		rst : in	std_logic;												--! Reset to 0
		inc : in	std_logic;												--! Increment
		val : out T_BCD_VECTOR(DIGITS+DIGITS-1 downto 0) 	--! Value output
	);
end entity;

architecture rtl of arith_counter_bcd is

begin

end architecture;