# poppins-mantl-testing

## A very rough sketch of what this can do in my head

For the [mantl project](mantl.io), like any good software, we want to have an
automated testing harness, to ensure that the code does what it is supposed to
do. Most projects rely on Continuous Integration systems, such as Jenkins,
Travis, and Drone, in order to make sure that the test harness is also run
automatically. So, I was tasked with creating such a system that worked well
with GitHub, and made it easy for contributors to know the correctness of their
PRs. 

What I found while I was working on this, was that the kind of
testing that we needed to do for Mantl is an edge case for CI systems, and
here's why:
- Mantl itself is an integration of many different components over networks. This means that even if Mantl's integration is written correctly, sometimes components or networks will fail. In a CI setup, this is a build failure; in Mantl, it's part of life
- Mantl has two types of configuration files that it needs to validate via testing: Terraform files, and Ansible files. We can using multi-VM vagrant & ansible_local to test the playbooks, but we can only validate terraform files with running against actualy cloud providers. In a CI setup, running code is cheap; in Mantl, it's expensive
- Mantl has a core + addons structure to the code, so the total number of states to check is large. This forms a build matrix that would get out of hand in a CI setup *very* quickly
- Because mantl supports many differnet cloud providers, there are code changes that only affect one provider. In a CI setup, you either have to have complex lagic to account for this, or run unnessessary, expensive tests
- Mantl clusters often have failures that can only be investigated by inspecting log files. With a CI system, the build log is the only one that is persisted, and oftentimes publicly visible.
- In most CI systems, the deploy step only executes on a successful build, so the deploy keys that you add to the system are easier to keep secure. Mantl's build step is it's deploy step, so security and access control is a real pain

With all of these issues with CI systems for something like Mantl, we've come up with a different idea: On Demand Integration.

On demand integration is when you have an integration test suite that is
started by a request that is not a git push. The request contains instructions
for the test, including what cloud providers we want to test against, what
Mantl addons or Marathan frameworks we want to install onto the cluster,
whether or not this should be tested against a fresh cluster, or one that's
been running for a while, and so on. This solves the state matrix problem by
relying on human judgement to dictate what state needs to be tested. And,
system logs can be perserved on demand as well. An on demand system can also
handle access control more complexly.

What this currently needs:
1. a working poppins plugin to accept and execute commands
2. a docker container to run the plugin
3. a working Marathon app that will container
4. mantl addon to install this system
5. a specification/implementation of the build requests
