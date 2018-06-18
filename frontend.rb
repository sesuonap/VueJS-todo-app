require "unirest"
require "pp"

while true
  system "clear"

  puts "Choose an option:"
  puts "[1] Show all tasks"
  puts "[2] Create a task"
  puts "[3] Show a task"
  puts "[4] Update a task"
  puts "[5] Delete a task"
  puts "[q] Quit"

  input_option = gets.chomp

  if input_option == "1"

    response = Unirest.get("http://localhost:3000/api/tasks")
    tasks = response.body
    pp tasks

  elsif input_option == "2"

    print "Enter new task text: "
    input_text = gets.chomp

    response = Unirest.post(
                            "http://localhost:3000/api/tasks",
                            parameters: {text: input_text}
                            )
    task = response.body
    pp task

  elsif input_option == "3"

    print "Enter a task id to show: "
    task_id = gets.chomp

    response = Unirest.get("http://localhost:3000/api/tasks/#{task_id}")
    task = response.body
    pp task

  elsif input_option == "4"

    print "Enter a task id to update: "
    task_id = gets.chomp
    response = Unirest.get("http://localhost:3000/api/tasks/#{task_id}")

    task = response.body
    params = {}

    print "Updated text (#{task["text"]}): "
    params[:text] = gets.chomp

    print "Updated completed (#{task["completed"]}): "
    params[:completed] = gets.chomp

    params.delete_if { |_key, value| value.empty? }

    response = Unirest.patch("http://localhost:3000/api/tasks/#{task_id}", parameters: params)
    task = response.body
    pp task

  elsif input_option == "5"

    print "Enter a task id to delete: "
    task_id = gets.chomp

    response = Unirest.delete("http://localhost:3000/api/tasks/#{task_id}")
    pp response.body

  elsif input_option == "q"

    puts "Goodbye!"
    break

  else

    puts "Unknown option!"

  end
  
  puts "Press enter to continue"
  gets.chomp
end
