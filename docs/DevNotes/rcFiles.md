# rc files

rc dotfiles are configuration files that can vary in their use, formatting, and overall meaning. You can create .[whatever name you like]rc files to inform whatever package you happen to be creating (provided another package isn't looking for the same one). Usually, they're useful for some sort of tool that acts on your source code and needs some tuning specific to your project. My understanding is that there were similar files that played an important role in UNIX systems in years past and the idea has stuck.

In short:

They're not specific to node.
They're just another file
As far as formats, they can be almost anything — it just depends on what you'll use to parse and read them. YAML, JSON, and ini are probably the most common (at least that I've seen).
In most cases they seem to follow the convention .[program or binary name]rc
package.json files can contain external metadata appropriate for config, it just depends on whether or not your project will expect a .rc file or expect it in package.json (or both, as in the case of babel)
See also:

What does "rc" mean in dot files
http://www.faqs.org/docs/artu/ch10s03.html#ftn.id2941902
https://en.wikipedia.org/wiki/Configuration_file

source: https://stackoverflow.com/questions/36212256/what-are-rc-files-in-nodejs
