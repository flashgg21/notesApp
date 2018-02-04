# -*- mode: ruby -*-
# vi: set ft=ruby :
# teviot config v0.9.1

Vagrant.configure("2") do |config|

    config.vm.box = "scotch/box"
    config.vm.box_version = "2.5.0"
    config.vm.network "private_network", ip: "192.168.24.40"
    config.vm.hostname = "www.notesapp.co.uk"

    config.vm.synced_folder ".", "/var/www", :nfs => { :mount_options => ["dmode=777","fmode=666"] }
    
    
    
    config.vm.provider "virtualbox" do |v|
	  host = RbConfig::CONFIG['host_os']
	
	  # Give VM 1/4 system memory 
	  if host =~ /darwin/
	    # sysctl returns Bytes and we need to convert to MB
	    mem = `sysctl -n hw.memsize`.to_i / 1024
	  elsif host =~ /linux/
	    # meminfo shows KB and we need to convert to MB
	    mem = `grep 'MemTotal' /proc/meminfo | sed -e 's/MemTotal://' -e 's/ kB//'`.to_i 
	  elsif host =~ /mswin|mingw|cygwin/
	    # Windows code via https://github.com/rdsubhas/vagrant-faster
	    mem = `wmic computersystem Get TotalPhysicalMemory`.split[1].to_i / 1024
	  end
	
	  mem = mem / 1024 / 4
	  v.customize ["modifyvm", :id, "--memory", mem]
	  
	  #video memory set to 32mb
	  v.customize ["modifyvm", :id, "--vram", 32]
	end

end

